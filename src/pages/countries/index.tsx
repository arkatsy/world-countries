import { Fragment, useEffect, useRef, useState } from 'react'
import FuzzySearch from 'fuzzy-search'
import {
  Box,
  Flex,
  Grid,
  Button,
  Portal,
  Center,
  IconButton,
} from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import { Country } from '@/lib/types'
import { useSearch } from '@/lib/useSearch'
import { Search, Dropdown, CountryCard } from '@/components'
import { API } from '@/lib/api'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const COUNTRIES_PER_SCROLL = 24

export const getServerSideProps: GetServerSideProps<{
  countries: Country[]
}> = async () => {
  const countries = await API.fetchAllCountries()

  return {
    props: {
      countries,
    },
  }
}

export default function Countries(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { countries: data } = props

  // True if we have more countries to show (we render 24 initially and then add 24 on each 'Load More' button click )
  const [hasNextPage, setHasNextPage] = useState(true)

  // Turns true when the user scrolls after a certain point - Used to show a button to scroll back to the top
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false)

  // Used to display the region that is currently being filtered.
  const ref = useRef() as any

  // fuzzy searchers for the input search and filter by region.
  const inputSearcher = useRef<FuzzySearch<Country>>()
  const filterSearcher = useRef<FuzzySearch<Country>>()

  // filtered countries by the search input
  const [inputFilterCountries, setInputFilterCountries] = useState<Country[]>(
    [],
  )
  // filtered countries by the dropdown filter
  const [regionFilterCountries, setRegionFilterCountries] = useState<Country[]>(
    [],
  )

  // helper to reset the countries properly when there are no filters
  const [useInitialData, setUseInitial] = useState(true)

  // total filtered countries combined from the inputFilterCountries and regionFilterCountries
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

  // countries that are displayed on the page
  const [showedCountries, setShowedCountries] = useState<Country[]>([])

  // contains state about the filters (search input and dropdown)
  const {
    currentState: search,
    onSearchInputChange,
    onFilterChange,
  } = useSearch()

  // Sets the next countries after the initial 24.
  // Takes into consideration the filters based on the useInitialData state.
  const loadMore = () => {
    if (useInitialData) {
      setShowedCountries((prev) => [
        ...data.slice(0, prev.length + COUNTRIES_PER_SCROLL),
      ])
    } else {
      setShowedCountries((prev) => [
        ...filteredCountries.slice(0, prev.length + COUNTRIES_PER_SCROLL),
      ])
    }
  }

  // After a certain scroll point scrollY > 400 we trigger scrollToTopBtn to show
  // the button to scroll back to the top.
  const handleScroll = () => {
    if (+window.scrollY.toFixed(0) > 400) {
      setScrollToTopBtn(true)
    } else {
      setScrollToTopBtn(false)
    }
  }

  // Scrolls to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // intialize the filters with all the data and set the fuzzy searchers
  useEffect(() => {
    setInputFilterCountries(data)
    setRegionFilterCountries(data)

    inputSearcher.current = new FuzzySearch(data, ['name.common'], {
      caseSensitive: false,
    })

    filterSearcher.current = new FuzzySearch(data, ['region'], {
      caseSensitive: false,
    })
  }, [data])

  // Used for scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Used to check if we have more countries to show
  useEffect(() => {
    setHasNextPage(showedCountries.length !== filteredCountries.length)
  }, [showedCountries, filteredCountries])

  // Does the actual filtering. Fires every time the search (input & dropdown filter) changes
  // Also it sets individual filters (inputFilterCountries & regionFilterCountries)
  useEffect(() => {
    if (inputSearcher.current && filterSearcher.current) {
      if (search.input) {
        setUseInitial(false)
        setInputFilterCountries(inputSearcher.current.search(search.input))
      }
      if (search.filter) {
        setUseInitial(false)
        setRegionFilterCountries(filterSearcher.current.search(search.filter))
      }
    }
  }, [search])

  // Takes the individual filters (inputFilterCountries & regionFilterCountries) and
  // then we push the intersection between them to the filteredCountries.
  useEffect(() => {
    const combined = inputFilterCountries.filter((country) =>
      regionFilterCountries.includes(country),
    )
    setFilteredCountries(combined)
  }, [inputFilterCountries, regionFilterCountries])

  // Push the filteredCountries to the showedCountries by parts COUNTRIES_PER_SCROLL
  useEffect(() => {
    setShowedCountries(filteredCountries.slice(0, COUNTRIES_PER_SCROLL))
  }, [filteredCountries])

  // Used to reset the countries when there are no filters
  useEffect(() => {
    if (search.input === '' && !search.filter) {
      setUseInitial(true)
      setInputFilterCountries(data)
      setFilteredCountries(data)
      setShowedCountries(data.slice(0, COUNTRIES_PER_SCROLL))
    }

    if (search.input === '' && search.filter) {
      setInputFilterCountries(data)
    }

    if (search.input !== '' && !search.filter) {
      setRegionFilterCountries(data)
    }
  }, [data, search])

  return (
    <Flex flexDir="column">
      <Flex
        flexDir={['column', null, null, 'row']}
        py={6}
        pb={6}
        justifyContent="space-between"
      >
        <Search onInputChange={onSearchInputChange} />
        <Dropdown ref={ref} onFilterChange={onFilterChange} />
      </Flex>
      <Box ref={ref} mb={12}></Box>
      <Grid
        justifyContent="center"
        templateColumns={{
          base: 'repeat(1, minmax(0, 350px))',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, minmax(0, 400px))',
          '2xl': 'repeat(4, 1fr)',
        }}
        gap={12}
        px={{
          md: 12,
          lg: 0,
          xl: 0,
        }}
        pb={10}
      >
        <>
          {showedCountries.map((country, idx) => (
            <Fragment key={idx}>
              <CountryCard country={country} />
            </Fragment>
          ))}
          {hasNextPage && (
            <Portal>
              <Center py={6}>
                <Button
                  onClick={() => loadMore()}
                  _hover={{
                    transform: 'scale(1.04)',
                  }}
                  _active={{
                    transform: 'scale(0.98)',
                  }}
                >
                  Load More
                </Button>
              </Center>
            </Portal>
          )}
          {scrollToTopBtn && (
            <IconButton
              aria-label="Scroll to top"
              position="fixed"
              bottom={10}
              right={6}
              onClick={scrollToTop}
              boxShadow="md"
              borderRadius="full"
              size="lg"
            >
              <ChevronUpIcon w="24px" h="24px" />
            </IconButton>
          )}
        </>
      </Grid>
    </Flex>
  )
}
