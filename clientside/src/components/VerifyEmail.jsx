import React, { useState } from "react"
import "../scss/VerifyEmail.scss"
import axios from 'axios'
import api from '../api/ApiConfig'
import { useNavigate } from "react-router-dom"

const verifyEmail = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      console.log(email)
      const res=await axios.post(`${api}/verifyEmail`,{email})
      console.log(res)
      if (res.status==200) {
        // alert(res.data.msg)
        navigate('/emailNotification')
        localStorage.setItem('Remail', email)
      }else{
        // alert("email already exist")
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="verify-container">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address:</label>
          <input  type="email"  name="email"  value={email}  onChange={handleChange}  required  placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn-verify">  Verify </button>
      </form>
    </div>
  )
}

export default verifyEmail
