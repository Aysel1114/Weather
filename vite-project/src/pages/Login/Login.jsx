import React, { useState } from 'react';
import css from './Login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setLoginMessage('');
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    setSignupMessage('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'İstifadəçi tapılmadı.') {
          setLoginMessage('Email düzgün deyil.');
        } else if (data.message === 'Şifrə səhvdir.') {
          setLoginMessage('Şifrə düzgün deyil.');
        } else if (data.message === 'Daxil olma uğurla tamamlandı!') {
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/home2');
        } else {
          setLoginMessage('Naməlum xəta baş verdi.');
        }
      })
      .catch((error) => {
        setLoginMessage(`Xəta baş verdi: ${error.message}`);
      });
  };
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || 'Xəta baş verdi.');
          });
        }
        return res.json();
      })
      .then((data) => {
        setSignupMessage('Qeydiyyat uğurla tamamlandı!');
        setIsSignUp(false);
      })
      .catch((error) => {
        setSignupMessage(error.message || 'Xəta baş verdi.');
      });
  };

  return (
    <div className={css.pageContainer}>
      <div className={`${css.container} ${isSignUp ? css.rightPanelActive : ""}`}>
        {isSignUp ? (
          <div className={`${css.formContainer} ${css.signUpContainer}`}>
            <form className={css.form} onSubmit={handleSignupSubmit}>
              <h1>Create Account</h1>
              <input 
                className={css.input} 
                name="name" type="text" 
                placeholder="Name" 
                value={signupData.name} 
                onChange={handleSignupChange} 
                required 
              />
              <input 
                className={css.input} 
                name="email" type="email" 
                placeholder="Email" 
                value={signupData.email} 
                onChange={handleSignupChange} 
                required 
              />
              <input 
                className={css.input} 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={signupData.password} 
                onChange={handleSignupChange} 
                required 
              />
              <button className={css.button} type="submit">Sign Up</button>
              {signupMessage && <p className={css.error}>{signupMessage}</p>}
            </form>
          </div>
        ) : (
          <div className={`${css.formContainer} ${css.signInContainer}`}>
            <form className={css.form} onSubmit={handleLoginSubmit}>
              <h1>Sign in</h1>
              <input 
                className={css.input} 
                name="email" type="email" 
                placeholder="Email" 
                value={loginData.email} 
                onChange={handleLoginChange} 
                required 
              />
              <input 
                className={css.input} 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={loginData.password} 
                onChange={handleLoginChange} 
                required 
              />
              <button className={css.button} type="submit">Sign In</button>
              {loginMessage && <p className={css.error}>{loginMessage}</p>}
            </form>
          </div>
        )}
        <div className={css.overlayContainer}>
          <div className={css.overlay}>
            <div className={`${css.overlayPanel} ${css.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className={css.buttonGhost} onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className={`${css.overlayPanel} ${css.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className={css.buttonGhost} onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

