import {useState,} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Replace this with actual registration logic
        localStorage.setItem('isRegistered', 'true');
        // Redirect to the home page
        navigate('/home');
      };


  return (
    <div className='register'>
        <h1>Register</h1>

       <form onSubmit={handleSubmit}>
       <div>
       <label htmlFor="username">username</label>
        <input 
        required
        type="text"
        placeholder='john dev'
        id="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        />
       </div>

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

      <div>
      <label htmlFor="gender">Gender</label>
      <select
      name="gender" 
      id='gender'
      value={gender}
      onChange={e => setGender(e.target.value)}>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      </select>
      </div>

      <div>
        <label htmlFor="date">Date of Birth</label>
        <input 
        type="date" 
        value={dateOfBirth} 
        onChange={e => setDateOfBirth(e.target.value)} />
      </div>
      <button type='submit'>sign up</button>

      <div>
      <Link to={'/login'}><p>Already registered ? <span>Sign in</span></p></Link>
      </div>
      </form>
        
    </div>
  )
}

export default Register
