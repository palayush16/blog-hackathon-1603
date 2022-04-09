import React, {useState,useEffect} from 'react'

const test = () => {
    const axios = require('axios');
    let [allObjects,setAllObjects] = useState([])

    

    useEffect(()=>{
        axios.get('http://localhost:5000/blogs').then((response) =>{
        console.log(response.data)
        setAllObjects(response.data);

    })
        

        


    },[])
  return (

  
    <div>{allObjects.map((post) =>(
        <div>{post.blogTitle}</div>
    ))}</div>

  )

}

export default test