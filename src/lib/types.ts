export type Regions = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'

export interface Flags {
  svg: string
  png: string
}

export interface Name {
  common: string
  official: string
  nativeName: NativeName
}

export interface NativeName {
  [key: string]: {
    official: string
    common: string
  }
}

export interface Currencies {
  [key: string]: {
    name: string
    symbol: string
  }
}

export interface Languages {
  [key: string]: string
}
export interface Country {
  flags: Flags
  name: Name
  capital: string[]
  population: number
  region: Regions
}

export interface CountryDetails {
  name: Name
  region: Regions
  subregion: string
  capital: string[]
  flags: Flags
  tld: string[]
  currencies: Currencies
  languages: Languages
  borders: string[]
  population: number
}
