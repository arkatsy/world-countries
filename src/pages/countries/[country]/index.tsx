import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import { API } from '@/lib/api'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { CountryDetails } from '@/lib/types'

export const getStaticPaths = async () => {
  const countries = await API.fetchAllCountries()

  const paths = countries.map((country) => ({
    params: {
      country: country.name.common,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  country: CountryDetails
}> = async ({ params }) => {
  const { country: name } = params as { country: string }

  const country = await API.fetchCountryDetails(name)

  return {
    props: {
      country: country[0],
    },
  }
}

export default function CountryDetailsPage({
  country,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const info = useMemo(
    () => ({
      primaryInfo: [
        { label: 'Native Name', value: country.name.official },
        { label: 'Population', value: country.population.toLocaleString() },
        { label: 'Region', value: country.region },
        {
          label: 'Sub Region',
          value: country.subregion.length ? country.subregion : 'N/A',
        },
        {
          label: 'Capital',
          value: country.capital.length ? country.capital : 'N/A',
        },
      ],
      secondaryInfo: [
        { label: 'Top Level Domain', value: country.tld[0] },
        {
          label: 'Currencies',
          value:
            Object.keys(country.currencies).length > 0
              ? country.currencies[Object.keys(country.currencies)[0]].name
              : 'N/A',
        },
        {
          label: 'Languages',
          value:
            Object.keys(country.languages).length > 0
              ? Object.values(country.languages)
                  .map((language) => language)
                  .join(', ')
              : 'N/A',
        },
      ],
    }),
    [country],
  )

  return (
    <Stack pt={{ base: 10, lg: '50px' }} spacing={{ base: 12, lg: '90px' }}>
      <GoBackButton />
      <Flex
        flexDir="column"
        alignItems={{ lg: 'center' }}
        gap={6}
        justifyContent="space-around"
        minH="500px"
      >
        <Box pb={4}>
          <Image
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            userSelect="none"
            draggable={false}
            minW={['100%', '100%', '100%', '800px']}
            maxW={['100%', '100%', '100%', '100%', '900px']}
          />
        </Box>
        <Flex flexDir={['column']}>
          <Stack spacing={6}>
            <Box textAlign={{ lg: 'center' }} pt={2} pb={[6, 8, 10, 12, 14]}>
              <Text
                fontSize={{ base: 'xl', lg: '2xl', xl: '3xl' }}
                fontWeight="bold"
              >
                {country.name.common}
              </Text>
            </Box>
          </Stack>
          <Grid
            w="100%"
            templateColumns={{
              base: 'repeat(1, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
            placeItems={{ base: 'start', xl: 'center' }}
            gap={{ base: 6, lg: 12 }}
            justifySelf="flex-start"
            fontSize={{
              base: 'md',
              md: 'lg',
              lg: 'md',
              xl: 'xl',
            }}
          >
            {Object.values(info).map((value, idx) => (
              <Stack key={idx} alignSelf={{ lg: 'start' }}>
                {value.map((section, idx) => (
                  <HStack key={idx}>
                    <Text fontWeight="bold">{section.label}</Text>
                    <Text>{section.value}</Text>
                  </HStack>
                ))}
              </Stack>
            ))}
            <Stack gridColumn={{ lg: '1/3' }}>
              <Text fontWeight="bold">Border Countries: </Text>
              <Flex gap={6} pb={12} flexWrap="wrap">
                {country.borders.length ? (
                  country.borders.map((border, idx) => (
                    <Tag
                      bg="element"
                      boxShadow="md"
                      key={idx}
                      size="lg"
                      userSelect="none"
                    >
                      <TagLabel>{border}</TagLabel>
                    </Tag>
                  ))
                ) : (
                  <Tag bg="element" boxShadow="md" size="lg" userSelect="none">
                    <TagLabel>N/A</TagLabel>
                  </Tag>
                )}
              </Flex>
            </Stack>
          </Grid>
        </Flex>
      </Flex>
    </Stack>
  )
}

const GoBackButton = () => {
  const router = useRouter()

  return (
    <Box>
      <Button onClick={() => router.push('/countries')}>
        <Center justifyContent="space-between" w="100%" gap={2}>
          <Icon>
            <ArrowBackIcon />
          </Icon>
          <span>Go Back</span>
        </Center>
      </Button>
    </Box>
  )
}
