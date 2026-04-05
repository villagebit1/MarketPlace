import styled from "styled-components"

const Card = styled.div`
    align-items: right; 
    background-color: #054f20;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    margin: 0 auto;
    max-width: 300px;
    padding: 25px 20px;
    justify-content: space-around; 
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

const LinkConta = styled.a`
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


function Passport({titulo, descricao, img}) {
    return (
        <SocialMedia>
          <SocialMediaDetails>
            <LinkConta href="/auth/github">
              <IconeConta src={img} alt={descricao} className="social-media-icon" />
              <p>GitHub</p>
            </LinkConta>
          </SocialMediaDetails>
        </SocialMedia>  
    )
}

export default Passport