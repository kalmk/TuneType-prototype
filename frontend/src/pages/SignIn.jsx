import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // Just an example! Will replace in production with actual API call
    if ((emailOrUsername === 'user@example.com' || emailOrUsername === 'demoUser') && password === '12345') {
      toast.success('Welcome back!')
      // small delay so the toast shows before navigation
      setTimeout(() => navigate('/homepage'), 700)
    } else {
      toast.error('Invalid credentials. Try again!')
    }
  }

  return (
    <div 
      className="min-h-screen flex"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                        radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-full flex items-center justify-center p-8">
        <form onSubmit={handleLogin} className="border-4 border-black rounded-3xl p-6 bg-white w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">SIGN IN</h2>
          <input 
            type="text" 
            placeholder="Email or Username" 
            className="w-full border-2 border-black p-2 mb-4 rounded" 
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border-2 border-black p-2 mb-4 rounded" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-gray-200 border-4 border-black px-8 py-2 rounded-xl font-bold hover:bg-gray-300">
            SIGN IN
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  )
}

export default SignIn