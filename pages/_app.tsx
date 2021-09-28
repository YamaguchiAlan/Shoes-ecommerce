import React, {useState, useEffect, useReducer} from 'react'
import {AppProps} from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import Router from 'next/router'
import Loader from '../components/loader'
import { cartReducer, initialCartState } from '../state/reducer'
import { CartContext } from '../state/context'

import 'fontsource-roboto'
import '../styles/styles.sass'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [loading, setLoading] = useState<boolean>(false)

  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  useEffect(() => {
    const start = (url) => (url !== Router.asPath && setLoading(true));
    const complete = (url) => (url === Router.asPath && setLoading(false));

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', complete)
    Router.events.on('routeChangeError', complete)

    return () => {
        Router.events.off('routeChangeStart', start)
        Router.events.off('routeChangeComplete', complete)
        Router.events.off('routeChangeError', complete)
    }
  })

  if(loading){
    return <Loader />
  }

  return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CartContext.Provider value={{state, dispatch}}>
            <Component {...pageProps} />
          </CartContext.Provider>
        </Hydrate>
        <ReactQueryDevtools/>
      </QueryClientProvider>
  )
}

export default MyApp
