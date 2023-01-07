import { StyleFunctionProps, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

type Themes = 'light' | 'dark'

const INITIAL_THEME: Themes = 'dark'
const USE_PREFFERED_THEME = false

export const colors = {
  dark: {
    background: 'hsl(207, 26%, 17%)',
    elements: {
      default: 'hsl(209, 23%, 22%)',
      hover: 'hsl(209, 23%, 30%)',
      active: 'hsl(209, 23%, 38%)',
      nested: 'hsl(209, 23%, 27%)',
    },
    text: 'hsl(0, 0%, 100%)',
  },
  light: {
    background: 'hsl(0, 0%, 98%)',
    elements: {
      default: 'hsl(0, 0%, 100%)',
      hover: 'hsl(0, 0%, 96%)',
      active: 'hsl(0, 0%, 90%)',
      nested: 'hsl(0, 0%, 95%)',
    },
    text: 'hsl(200, 15%, 8%)',
  },
}

export const config: ThemeConfig = {
  initialColorMode: INITIAL_THEME,
  useSystemColorMode: USE_PREFFERED_THEME,
}

export const breakpoints = {
  sm: '400px',
  md: '550px',
  lg: '800px',
  xl: '1050px',
  '2xl': '1740px',
}

export const fonts = {
  heading: `'Nunito Sans', sans-serif`,
  body: `'Nunito Sans', sans-serif`,
}

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode('light.text', 'dark.text')(props),
      background: mode('light.background', 'dark.background')(props),
      overflowY: 'scroll',
    },
    p: {
      whiteSpace: 'nowrap',
    },
  }),
}

export const semanticTokens = {
  colors: {
    text: {
      default: 'dark.text',
      _light: 'light.text',
    },
    background: {
      default: 'dark.background',
      _light: 'light.background',
    },
    element: {
      default: 'dark.elements.default',
      _light: 'light.elements.light',
    },
    nested: {
      default: 'dark.elements.nested',
      _light: 'light.elements.nested',
    },
  },
}
