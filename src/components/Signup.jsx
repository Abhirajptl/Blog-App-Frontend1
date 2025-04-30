import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [data, setData] = useState({
        username:"",
        password:"",
        role:""
    })


    const handleSignup = (e) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]:value
        })
    }
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async() => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
           const response = await axios.post(`${apiUrl}/user/register`,data)
           alert("You are successfully registered, Please login")
           if(response.status === 201){
            navigate('/login')
           }
        } catch (error) {   
            setError('Registration Failed please try again',error)
        }
    }

  return (
    <div className='signup-container'>
        <h3>Please Register</h3>
        {error && <p style={{color:'red'}}>{error}</p>}
        <input name="username" value={data.username} onChange={(e) => handleSignup(e)}  type="text" id='username' placeholder="ENTER USERNAME"/>
        <input name="password" value={data.password} onChange={(e) => handleSignup(e)}  type="text" id='password' placeholder="ENTER PASSWORD"/>
        <select value={data.role} onChange={(e) => handleSignup(e)} id="role" name="role">
            <option value="">Select User Type</option>
            <option value="reader">Reader</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Signup