import {
  Flex,
  Spacer,
  Box,
  Text,
  IconButton,
  useColorMode,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

const minWidth = '340px'
const maxWidth = '1740px'
const headerHeight = {
  base: '98px',
  lg: '86px',
}
const paddingX = {
  base: 6,
  lg: 12,
}

function Layout(props: LayoutProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const headerBg = useColorModeValue(
    'light.elements.default',
    'dark.elements.default',
  )

  return (
    <VStack minH="100vh" minW={minWidth}>
      <Flex
        flexDir="column"
        alignItems="center"
        width="100%"
        color="text"
        bg={headerBg}
        h={headerHeight}
        boxShadow="lg"
        position="fixed"
        top="0"
        left="0"
        zIndex="9999"
        w="100%"
      >
        <Box w="100%" maxW={maxWidth} height={headerHeight}>
          <Flex h="100%" alignItems="center">
            <Link href="/countries">
              <Box px={paddingX}>
                <Text fontSize="xl" fontWeight="bold" userSelect="none">
                  Where in the world?
                </Text>
              </Box>
            </Link>
            <Spacer />
            <Box>
              <Box px={paddingX}>
                <IconButton
                  aria-label={`Toggle ${colorMode} mode`}
                  boxShadow="none"
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  size="md"
                  onClick={toggleColorMode}
                  sx={{
                    backgroundColor: 'nested',
                  }}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Box w="100%" maxW={maxWidth} px={paddingX} pt={headerHeight}>
        {props.children}
      </Box>
    </VStack>
  )
}

export default Layout
