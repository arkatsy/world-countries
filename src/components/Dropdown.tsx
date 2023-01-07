import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
  Portal,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { TriangleDownIcon, CloseIcon } from '@chakra-ui/icons'
import { forwardRef, useState } from 'react'

import type { Regions } from '@/lib/types'

interface DropdownProps {
  onFilterChange: (region: Regions | null) => void
}

const regions: Regions[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const Dropdown = forwardRef(function Dropdown(props: DropdownProps, ref: any) {
  const [filteredRegion, setFilteredRegion] = useState<Regions | null>(null)
  const menuListBg = useColorModeValue(
    'light.elements.default',
    'dark.elements.default',
  )

  const onRegionClicked = (region: Regions) => {
    setFilteredRegion(region)
    props.onFilterChange(region)
  }

  const onDelete = () => {
    setFilteredRegion(null)
    props.onFilterChange(null)
  }

  return (
    <Menu>
      {filteredRegion && (
        <FilteredRegion onDelete={onDelete} ref={ref} region={filteredRegion} />
      )}
      <MenuButton
        borderRadius="md"
        w="225px"
        bg="element"
        h="55px"
        boxShadow="md"
        _expanded={{ boxShadow: 'lg' }}
        _focusVisible={{ boxShadow: 'var(--chakra-shadows-outline)' }}
      >
        <Flex justifyContent="space-around" userSelect="none">
          Filter by Region
          <TriangleDownIcon
            sx={{
              position: 'relative',
              top: '5px',
            }}
          />
        </Flex>
      </MenuButton>
      <MenuList border="none" boxShadow="lg" py="0" bg={menuListBg}>
        {regions.map((region, idx) => (
          <MenuItem
            key={idx}
            bg="transparent"
            onClick={(e: any) => onRegionClicked(e.target.textContent)}
            borderRadius="md"
            _hover={{ bg: 'nested' }}
            py="12px"
          >
            <Text pl={3}>{region}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
})

const FilteredRegion = forwardRef(function FilteredRegion(
  props: {
    region: Regions
    onDelete: () => void
  },
  ref: any,
) {
  const { region, onDelete } = props
  return (
    <Portal containerRef={ref}>
      <Button
        bg="element"
        variant="unstyled"
        onClick={onDelete}
        fontWeight="normal"
        color="nested"
        _hover={{ color: 'text', bg: 'nested' }}
        _focus={{ color: 'text' }}
      >
        <Flex px="20px" w="100%" gap="10px">
          <Text
            sx={{
              textTransform: 'capitalize',
              color: 'text',
            }}
          >
            {region}
          </Text>
          <Icon
            as={CloseIcon}
            boxSize="2.5"
            focusable
            alignSelf="center"
            color={['text', 'text', 'text', 'text', 'inherit']}
          />
        </Flex>
      </Button>
    </Portal>
  )
})

export default Dropdown
