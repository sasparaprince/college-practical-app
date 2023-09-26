import React from 'react'
import PracticalListing from '../components/PracticalListing'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Practical = () => {
  return (
    <>
      <Navbar />
      <div>
        <PracticalListing />
      </div>
      <Footer />
    </>


  )
}

export default Practical