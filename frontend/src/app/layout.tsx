"use client"
import { Inter, Roboto } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter', 
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});
import { Provider } from "@/components/ui/provider"
import { Wrapper } from './style';
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="pt-BR" className={`${inter.variable} ${roboto.variable}`}
    suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Simulador de Frete</title>
      </head>
      <body>
        <Provider>
          <Wrapper>
            <Toaster />
            {children}
          </Wrapper>
        </Provider>
      </body>
    </html>
  )
}