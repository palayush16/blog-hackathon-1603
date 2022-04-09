import React from 'react'
import Navbar from "../components/Navbar";
import CreateBlog from "../components/CreateBlog";


const Blog = () => {
  return (
    <div>
        <Navbar/>
        <CreateBlog className="create-blog-container"/>
    </div>
  )
}

export default Blog  