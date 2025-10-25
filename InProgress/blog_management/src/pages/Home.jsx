import React from 'react'
import Hero from '../components/HomePage/Hero'
import  LatestBlog from '../components/HomePage/LatestBlog'
import StatsSection from '../components/HomePage/StatsSection'
import CtaSection from '../components/HomePage/CtaSection'
const Home = () => {
  return (
    <>
        <Hero/>
        <LatestBlog />
        <StatsSection />
        <CtaSection />
    </>
  )
}

export default Home