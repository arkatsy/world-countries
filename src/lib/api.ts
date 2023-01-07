import { Country, CountryDetails } from './types'

const API_ORIGIN = 'https://restcountries.com/v3.1'

const fetcher = async (endpoint: string) => {
  const res = await fetch(`${API_ORIGIN}${endpoint}`, {
    method: 'GET',
  })
  return await res.json()
}

export const API = {
  fetchAllCountries: () =>
    fetcher(`/all?fields=name,region,population,flags`) as Promise<Country[]>,
  fetchCountryDetails: (name: string) =>
    fetcher(
      `/name/${name}?fields=name,subregion,region,capital,flags,tld,currencies,languages,borders,population`,
    ) as Promise<[CountryDetails]>,
}
