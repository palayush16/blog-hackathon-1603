import React from 'react'
import Link from 'next/link'

const toggleFunc = () => {
    const hamburger=document.querySelector('.hamburger');
    const navlinks=document.querySelector('.nav-links');
    navlinks.classList.toggle('show');

}
const Navbar = () => {
  return (
    <div className="nav-container">
            <div className="nav-logo">
            <h1>LGBTQ+ ALLY</h1>
            </div>
            <div className="hamburger" onClick={toggleFunc}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="nav-links show">
                <ul className="nav-links-list">
                <Link href="/"><li><a href="#">Home</a></li></Link>
                <Link href="/feeds"><li><a href="#">Feed</a></li></Link>
                <Link href="/blog"><li><a href="#">Blogs</a></li></Link>
                
                </ul>
            </div>
            
        </div>
  )
}

export default Navbar