import React,{useEffect,useState} from 'react'
import Link from 'next/link'

const Blogpost = () => {

    const axios = require('axios');
    let [allObjects,setAllObjects] = useState([])

    

    useEffect(()=>{
        axios.get('http://localhost:5000/blogs').then((response) =>{
        console.log(response.data)
        setAllObjects(response.data);

    })
        
    },[])
    
  return (
    <div className="blog-container">
        <div className="blog-container-list">
            <h2>Blogs</h2>
            <h3>Express yourself and Learn from others</h3>
            {allObjects.map((post) => (
                <div className="blog">
                    
                    <div className="blog-item">
                        <h4>{post.blogTitle}</h4>
                        <h5>{post.blogAuthor}</h5>
                        <p>{post.blogBody}</p>
                    </div>
                </div>
            ))}
            
        </div>
        <div className="blog-container-create">
            <h2>Share or express your prespective in a blog form</h2>
            <h3>Do you have writing ablity to create a blog</h3>
        <Link  href="/createBlog" type="button" ><h4>Create Blog</h4></Link>
        </div>
    </div>
  )
}

export default Blogpost