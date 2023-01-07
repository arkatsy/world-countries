import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Image,
  Stack,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import type { Country } from '@/lib/types'

interface CardProps {
  country: Country
}

const CountryCard = ({ country }: CardProps) => {
  return (
    <Card
      borderRadius="md"
      w="100%"
      boxShadow="md"
      _hover={{
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        transform: 'scale(1.05)',
        boxShadow: 'xl',
      }}
      pb={4}
    >
      <CardHeader p="0" borderTopRadius="md">
        <Link href={`/countries/${country.name.common}`}>
          <Image
            src={country.flags.svg}
            alt={`${country.name.common} country flag`}
            borderTopRadius="md"
            h="220px"
            objectFit={['cover']}
            w="100%"
            draggable="false"
            userSelect="none"
          />
        </Link>
      </CardHeader>
      <CardBody>
        <Stack spacing={4} w="fit-content">
          <Link href={`/countries/${country.name.common}`}>
            <Text fontSize="xl" fontWeight="bold" whiteSpace="initial">
              {country.name.common}
            </Text>
          </Link>
          <Stack>
            <HStack>
              <Text fontWeight="bold">Population:</Text>
              <Text>{country.population.toLocaleString()}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Region:</Text>
              <Text>{country.region}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Capital:</Text>
              <Text>{country.capital.length ? country.capital : 'N/A'}</Text>
            </HStack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default CountryCard
