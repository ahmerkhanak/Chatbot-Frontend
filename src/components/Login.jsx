// import React, { useState } from 'react';
// import '../css/Auth.css'

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://chatbot-backend-snowy-one.vercel.app/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       if (data.token) {
//         localStorage.setItem('token', data.token); // Store the "Wristband"
//         window.location.href = '/chat'; // Redirect to chat
//       } else {
//         alert(data.message || "Invalid Login");
//       }
//     } catch (err) {
//       console.error("Login failed", err);
//     }
//   };

import { useState } from 'react';
import '../css/Auth.css'

function Login(){

  const [formData, setFormData] = useState({email: '', password: ''});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return setError('Please enter a valid email address.');
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        return setError('Password requires 8 chars, an uppercase, lowercase, and a number.');
    }

    try{

      const response = await fetch('https://chatbot-backend-snowy-one.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if(data.token){
        localStorage.setItem('token', data.token);
        window.location.href = '/chat';
      } else {
        setError(data.message || 'Invalid credentials');
      }

    } catch (err){
        console.error('Error', err);
    }
  };

 return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue your cinematic chat experience.</p>
      </div>
      
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
        </div>
        <button type="submit" className="auth-btn">Sign In</button>
      </form>
      <div className="auth-footer">
        Don't have an account? <a href="/register" className="auth-link">Create one</a>
      </div>
    </div>
  );

}

export default Login;