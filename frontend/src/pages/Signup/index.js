import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you use react-router
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --background-color: #01080E;
    --verde-destaque: #81FE88;
    --offwhite: #E1E1E1;
    --cinza-escuro: #171D1F;
    --cinza-medio: #888888;
    --font-family: "Prompt", sans-serif;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; /* Matches your CSS */
    height: 100vh;
    margin: 0;
    gap: 1rem;
  }

  @media (max-width: 1200px) {
    body {
      flex-direction: column; /* Matches your media query */
    }
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: 100vh;
  background-color: var(--background-color);

  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 2rem 0;
  }
`;

// 2. STYLED COMPONENTS
const Header = styled.header`
  .logo {
    margin-top: 0.45rem;
    height: 45rem;
    width: 40.03rem;
    object-fit: cover;

    @media (max-width: 1200px) {
      display: none; /* Matches your media query */
    }
  }
`;

const Btn = styled.button`
    background-color: #81FE88;
    border-radius: 0.5rem;
    width: 6.5rem;
    height: 3.5rem;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.6rem;
    text-align: center;
    margin-bottom: 1rem;
`

const Form = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 0.625rem;
`
const Campo = styled.label`
  color: blue;
`

const Main = styled.main`
  padding: 1.2rem;
  background-color: var(--cinza-escuro);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 42.53rem;
  
  h1 { color: var(--offwhite); font-size: 2rem; margin-bottom: 1.25rem; }
  h2 { color: var(--offwhite); font-size: 1.2rem; margin-bottom: 0.625rem; }

  @media (max-width: 1200px) {
    width: 40rem;
    height: 50rem;
  }
`;

export default function Signup() {
  // 1. Define State for the form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading
    setError('');

  try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Response from server')

      if (data.success) {
        navigate('/'); // Redirect to login on success
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Internal Server Error. Please try again later.');
    } 
  };

  return (
    <div className="signup-page">
      <PageContainer>
        <header>
            <img src="/assets/signup.jpeg" alt="computer" className="logo" />
        </header>

        <Main>
            <h1>Crie sua conta</h1>
            <h2>Faça seu cadastro</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Form className="signup">
                <Campo htmlFor="name">Usuário</Campo>
                <input 
                    type="text" 
                    id="name" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
                
                <Campo htmlFor="email">Email</Campo>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />

                <Campo htmlFor="password">Senha</Campo>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />

                <div className="login-btn-container">
                    <button className="login-btn" onClick={ handleSubmit }>
                    Criar <i className="arrow fas fa-arrow-right"></i>
                    </button>
                </div>
            </Form>

            <section className="create_account">
            <p>Já possui uma conta?</p>
            {/* Using Link instead of <a> tags for SPA navigation */}
            <Link to="/">
                Faça o login! <img src="/assets/assignment.svg" alt="ícone de uma prancheta" />
            </Link>
            </section>
        </Main>
      </PageContainer> 
    </div>
  );
};

//export default Signup;