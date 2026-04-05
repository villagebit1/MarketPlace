import styled from 'styled-components';
import React from 'react';

const LoginForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 0.625rem;
`
const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

export default function Form({ error }) {
    return (
        <LoginForm>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" required />

            {/* 2. React-style conditional rendering */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/*<div className="login-btn-container">
        
            </div>*/}
        </LoginForm> 
    );

}