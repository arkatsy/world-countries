import { extendTheme } from '@chakra-ui/react'
import '@fontsource/nunito-sans'

import * as components from './components'

import {
  colors,
  config,
  breakpoints,
  fonts,
  styles,
  semanticTokens,
} from './theme'

export const theme = extendTheme({
  config,
  breakpoints,
  fonts,
  colors,
  styles,
  semanticTokens,
  components: {
    ...components,
  },
})
