import { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Replace this with actual registration logic
      localStorage.setItem('isRegistered', 'true');
      // Redirect to the home page
      navigate('/home');
    };
  return (
    <div className='login'>
     
     <form onSubmit={handleSubmit}>
     <h1>LOGIN</h1>
      
     <div>
        <label htmlFor="email">Email</label>
        <input 
        required
        type="email"
        placeholder='john@dev'
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  
        />
        </div>

        <div>
        <label htmlFor="password">Password</label>
        <input 
        required
        type="password"
        placeholder='enter password'
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  
        />
        </div>
        <button type='submit'>sign in</button>

      <div>
      <p>Already Signed in ? </p>
      <button><FcGoogle/> <span>Sign in with Google</span> </button>
      </div>
      <Link to={'/register'}><p>Don't have account?</p>Sign up</Link>
     </form>
    </div>

    

      
      
  )
}

export default Login
