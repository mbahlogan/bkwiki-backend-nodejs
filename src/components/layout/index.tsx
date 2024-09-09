import React from 'react'
import Nav from './nav'
import Footer from './footer'
import { PageLayoutProps } from '@/types'


export default function PageLayout({ children}: PageLayoutProps) {
  return (
    <div className='min-h-screen flex flex-col'>
        <Nav />
        <main className='flex-1'>
          {children}
        </main>
        <Footer />
    </div>
  )
}
