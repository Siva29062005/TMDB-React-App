import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Main from '../../components/Main/Main'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <Hero/>
      <Main/>
    </div>
  )
}

export default Home