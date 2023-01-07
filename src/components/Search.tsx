import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface SearchProps {
  onInputChange: (input: string) => void
}

function Search({ onInputChange }: SearchProps) {
  return (
    <InputGroup mb={[6, null, null, 0]} maxW="450px" h="60px" height="55px">
      <InputLeftElement h="55px" pointerEvents="none" pl="6px">
        <SearchIcon />
      </InputLeftElement>
      <Input
        minW="250px"
        w="100%"
        h="100%"
        bg="element"
        boxShadow="md"
        border="none"
        placeholder="Search for a country..."
        userSelect="none"
        _focus={{
          boxShadow: 'lg',
        }}
        _focusVisible={{
          boxShadow: 'var(--chakra-shadows-outline)',
        }}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </InputGroup>
  )
}

export default Search
