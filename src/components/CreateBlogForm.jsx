// import React, { useState } from 'react'
// import './CreateBlogForm.css'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'


// const CreateBlogForm = () => {
//   const [title, setTitle] = useState()
//   const [content, setContent] = useState()
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit = async ()=>{
//     const token = localStorage.getItem('token');
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.post(`${apiUrl}/blog/create`,{
//         title,
//         content
//       },{
//         headers : {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       if(response.status === 200){
//         alert('Blog created successfully')
//         navigate('/blogs');
//       }
//     } catch (error) {
//       setError('Blog creation failed, please try again')
//     }
//   }
//   return (
//     <div className='create-blog-container'>
//       <h3>Create a Blog</h3>
//       {error && <p style={{color:'red'}}>{error}</p>}
//       <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id='title' placeholder="ENTER TITLE"/>
//       <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" id='content' placeholder="ENTER CONTENT"/>
//       <button onClick={handleSubmit}>Create Blog</button>
//     </div>
//   )
// }

// export default CreateBlogForm




import React, { useState } from 'react';
import './CreateBlogForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
  
      console.log('Form Data:', {
        title,
        content,
        image: image ? image.name : null,
      });
  
      const response = await axios.post(`${apiUrl}/blog/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        alert('Blog created successfully');
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Error creating blog:', error.response || error.message);
      setError('Blog creation failed, please try again');
    }
  };

  return (
    <div className="create-blog-container">
      <h3>Create a Blog</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="title"
        placeholder="ENTER TITLE"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        id="content"
        placeholder="ENTER CONTENT"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button onClick={handleSubmit}>Create Blog</button>
    </div>
  );
};

export default CreateBlogForm;




