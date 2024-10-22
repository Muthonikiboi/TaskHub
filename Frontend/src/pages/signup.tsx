import React, { useState } from 'react';
import axios from 'axios';
import google from '../assets/google.png';

const form: React.CSSProperties = {
    width: '60%',
    backgroundColor: 'whitesmoke',
    margin: 'auto',
    height: '80vh',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', 
    alignItems: 'center',
    borderRadius: 20
}
const heading = {
    fontSize: '50px',
    marginBottom: '15px',
    color: '#92e3a9',
    marginTop: '50px',
}

const signIn = {
    fontSize: '30px',
    marginBottom: '8px',
}

const userInput = {
    padding: '10px 60px ',
    marginTop: '5px',
    borderRadius: '10px',
    border: '1px solid black'
}

const label={
    marginTop: '10px',
}

const forget = {
    marginTop: '20px',
    marginBottom: '20px',
    color: '#92e3a9',
    marginLeft: '180px',
    textDecoration: 'underline', 
    cursor: 'pointer',
}

const btn={
    padding: '10px 128px',
    border:'none',
    borderRadius: '10px',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '25px',
}
const googleDiv = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    cursor: 'pointer',
}

const googleImg = {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
}

const span = {
    color: '#92e3a9',
    textDecoration: 'underline', 
    cursor: 'pointer',
    fontWeight: 'bold',
}

const pNext = {
    marginTop:'10px',
}

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();

      // Simple validation
      if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
      }

      try {
          const response = await axios.post('http://localhost:7000/api/v1/users/register', {
              useremail: email,
              userpassword: password,
              username: username,
          });

          // Handle success response
          console.log('User registered successfully:', response.data);

          // Clear form
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
      } catch (error) {
          // Handle error response
          // console.error('Error during registration:', error.response?.data || error.message);
          console.log(error);
          alert('Failed to register. Please try again.');
      }
  };

  return (
      <form onSubmit={handleSignUp} style={form}>
          <h1 style={heading}>TASKHUB</h1><br /><br />
          <h2 style={signIn}>SIGN UP</h2>

          <label style={label}>
              <p>Username</p>
              <input
                  type="text"
                  style={userInput}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
          </label>
          <label style={label}>
              <p>Email</p>
              <input
                  type="email"
                  style={userInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label style={label}>
              <p>Password</p>
              <input
                  type="password"
                  style={userInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
          </label>
          <label style={label}>
              <p>Confirm Password</p>
              <input
                  type="password"
                  style={userInput}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </label>

          <h4 style={forget}>Forgot password?</h4>
          <div>
              <button type="submit" style={btn}>Sign Up</button>
          </div>

          <p>or</p>
          <div style={googleDiv}>
              <img src={google} alt="Google" style={googleImg} />
              <p>Sign in with Google</p>
          </div>
          <p style={pNext}>Already have an Account? <span style={span}>Sign In</span></p>
      </form>
  );
}

export default SignUp;