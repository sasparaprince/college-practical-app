import React from 'react'
import Loader from 'react-loading';


const Loading = () => {
  return (
    <div className="loader-container">
    <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
  </div>
  )
}

export default Loading