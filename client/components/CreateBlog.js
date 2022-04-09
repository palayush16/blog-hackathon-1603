import React from 'react'
import Link from 'next/link'

const CreateBlog = () => {
  return (
    <div className="create-blog-container">
        <form action='http://localhost:5000/blogpost' method='POST' className="form-blog">
            <h2>Create Blog</h2>
            <input className="form-title" type="text" name="blogTitle" placeholder="Blog title"/>
            
            <input className="form-author" type="text" name="blogAuthor" placeholder="Author"/>
            {/* <Link href="/blog"><input type="submit" name="" value="Upload Image"/></Link> */}
            <textarea name="blogBody" className="form-body" placeholder="Blog Body"></textarea>
            <input type="submit" name="" value="Submit"/>
            
        </form>
    </div>
  )
}

export default CreateBlog