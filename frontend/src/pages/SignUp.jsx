import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/homepage')
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
          <h2 className="text-xl font-bold mb-4">SIGN UP</h2>
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full border-2 border-black p-2 mb-4 rounded" 
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Email" 
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
          <button type="submit" className="w-full bg-gray-200 border-4 border-black px-8 py-2 rounded-xl font-bold hover:bg-gray-300 mb-4">
            SIGN UP
          </button>
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={() => navigate('/signin')}
              className="flex items-center gap-2 text-sm hover:font-bold transition"
            >
              Already have an account? <span>→</span>
            </button>
          </div>
        </form>
      </div>
      </div>
  )
}

export default SignUp