import { Inter } from '@next/font/google';
import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      fontFamily: inter.style.fontFamily,
      headings: { fontFamily: inter.style.fontFamily },
      colors: {
        brand: [
          '#eef2ff',
          '#e0e7ff',
          '#c7d2fe',
          '#a5b4fc',
          '#818cf8',
          '#6366f1',
          '#4f46e5',
          '#4338ca',
          '#3730a3',
          '#312e81',
        ],
      },
      primaryColor: 'brand',
      globalStyles: ({ colors, colorScheme }) => ({
        body: {
          backgroundColor: colorScheme === 'dark' ? colors.dark[7] : colors.gray[0],
        },
      }),
    }}
  >
    {children}
  </MantineProvider>
);
