import React from 'react'

import Link from 'next/link'

const LandingComp = () => {
  return (
    <div className="container">
    <div className="landingComp">
        <div className="liner">
            
            <h1>Out of the Closets and into the Streets</h1>
            <h2>#LoveIsLove</h2>
        </div>
        <div className="login-cta">
            <h2>Become member of our Social Community </h2>
            <h3>Login or Register and be the part of revolution</h3>
            <Link  href="/auth" type="button" ><h4>Join</h4></Link>
        </div>
    </div>
    </div>
  )
}

export default LandingComp