import '@/styles/globals.css'
import { EventContextProvider } from '../../components/EventContextProvider'
import Layout from '../../components/Layout'
//import context from newly made context file
//grab react {useState,useEffect} from 'react'

export default function App({ Component, pageProps }) {
 //usestate allevent

  return (
    <Layout>
   {/* wrap with provider */}
       <Component {...pageProps} />
    {/* wrap with provider */}
    </Layout>
  )
  
  
}
