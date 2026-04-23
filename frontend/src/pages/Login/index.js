//import Header from 'components/Header';
//import Form from 'components/Form'
import styles from './Login.css';
import relogio from 'assets/inicial.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import Passport from 'components/Passport'
import styled, { createGlobalStyle } from 'styled-components';
import crossblue from 'assets/CrossBlue.jpg';
import google from 'assets/google.svg';
import github from 'assets/github.svg';
import { useAuth } from '../../AuthContext';

const Img = styled.img`

`

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
const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: -3.5rem;
  gap: 2rem;
`

const SocialMediaDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SocialMediaIcon = styled.div`
  height: 3rem;
  width: 3rem;
  margin-top: 5rem;
`

// .social-media-details a p {
//     color: var(--offwhite);
//     font-size: 1.5rem;
//     text-align: center;
//     margin-top: 0.3rem;
//     font-weight: 400;
//     font-size: 1rem;
//     line-height: 1.2rem;
// }

const CreateAccount = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 3rem;
  font-weight: 400;
`

const CreateAccountParagraph = styled.p`
  color: var(--offwhite);
  font-size: 1rem;
  line-height: 1.4rem;
`

const CreateAccountLink = styled.a`
  text-decoration: none;
  color: var(--verde-destaque);
  font-size: 1.2rem;
  line-height: 2rem;
`

const AlternateAccounts = styled.p`
    width: 100%;
    text-align: center;
    border-bottom: 0.0625rem solid var(--offwhite); 
    line-height: 0.1em;
    margin-top: 1rem;
    color: var(--offwhite);
    font-weight: 400;
    font-size: 1rem;
`

const AlternateSpan = styled.span`
    background: var(--cinza-escuro);
    padding: 0 2rem;
`

const ContaAlternativa = styled.a`
    color: var(--offwhite);
    font-size: 1.5rem;
    text-align: center;
    margin-top: 0.3rem;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
`

const IconeConta = styled.img`
    height: 3rem;
    width: 3rem;
    margin-top: 5rem;
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

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoggin = async (e) => {
    e.preventDefault(); 
    console.log('FormData vlr: ', formData)

    try {
          const res = await fetch('http://localhost:4000/', {
            method: 'POST', 
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
    
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

          // if (!formData.email.includes('@')) {
          //   setError('Por favor, insira um email válido.');
          // }
          // else {
          //     setError('');
          // }
      
         // Store it (LocalStorage is common, though less secure than cookies)
        //localStorage.setItem('isLoggedIn', 'true');//('token', token);

        const userData = await res.json();
        setUser(userData); // Update auth context

        console.log("Login realizado com sucesso! Redirecionando para a loja...");
        navigate('/home');                   
    } catch (error) {
        console.error("Submission failed:", error);
        setError(error.message);
    };
 
  };

  return (
    <>
      <GlobalStyle/>
        <PageContainer>
          <Header>
              <img src={crossblue} alt='car' className="logo"/>
          </Header>

          <Main>
            <h1>Login</h1>
            <h2>Faça seu login</h2>
            
            {/* error='undefined' */}
            <Form error={error}>
                <Campo htmlFor="email">Email</Campo>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />{/*formData.email*/}

                <Campo htmlFor="password">Senha</Campo>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />{/*formData.password*/}

                {/* <button type="submit">Login</button> */}

                {/* 2. React-style conditional rendering */}
                {error && <p>{error}</p>}

                <Btn
                  className={styles.finalizar}
                  //onClick={() => dispatch(resetarCarrinho())}
                  onClick={ handleLoggin }
                >
                Login
                </Btn>              
            </Form> 

            <AlternateAccounts><AlternateSpan>ou entre com outras contas</AlternateSpan></AlternateAccounts>

            <SocialMedia>
              <SocialMediaDetails>
                <ContaAlternativa href="#">
                  <IconeConta src={google} alt="Login com Google" className="social-media-icon" />
                  <p>Google</p>
                </ContaAlternativa>
              </SocialMediaDetails>

              <SocialMediaDetails>
                <ContaAlternativa href="#">
                  <IconeConta src={github} alt="Login com Github" className="social-media-icon" />
                  <p>Github</p>
                </ContaAlternativa>
              </SocialMediaDetails>

            </SocialMedia>

            <CreateAccount>
              <CreateAccountParagraph>Ainda não tem conta?</CreateAccountParagraph>
              <CreateAccountLink href="/signup">
                Crie seu cadastro! <img src="/assets/assignment.svg" alt="ícone de uma prancheta" />
              </CreateAccountLink>
            </CreateAccount>
          </Main>
        </PageContainer>
    </>
  )
}