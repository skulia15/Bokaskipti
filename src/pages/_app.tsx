import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import React from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../styles/theme';
import NavigationBar from '@/components/NavigationBar';
import Container from '@mui/material/Container';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <React.Fragment>
        <Head>
          <title>StorySwap</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <NavigationBar />
          <Container
            maxWidth="lg"
            sx={{
              paddingTop: '69px', // Add a top padding to the main content container
            }}
          ></Container>
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </SessionProvider>
  )
}
