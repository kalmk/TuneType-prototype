import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div>
      {/*logo :) */}
      <img
        src="/assets/tunetype-logo.png"
        alt="TuneType Logo"
        classname="w-64 h-64"
      />
    </div>
  )
}

export default Welcome