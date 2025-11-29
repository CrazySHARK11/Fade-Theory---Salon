import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function LayoutPublic({ children }) {
  return (
    <>
     <Header />
     <main>{children}</main>   
     <Footer />
    </>
  )
}
