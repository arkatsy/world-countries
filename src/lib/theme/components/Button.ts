import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const Button = defineStyleConfig({
  baseStyle: defineStyle({
    boxShadow: 'md',
  }),

  variants: {
    solid: defineStyle((props) => ({
      color: mode('light.text', 'dark.text')(props),
      background: mode(
        'light.elements.default',
        'dark.elements.default',
      )(props),

      _hover: {
        background: mode('light.elements.hover', 'dark.elements.hover')(props),
      },

      _active: {
        background: mode(
          'light.elements.active',
          'dark.elements.active',
        )(props),
      },
    })),
  },

  defaultProps: {
    variant: 'solid',
  },
})
