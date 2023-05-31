import styled from "styled-components";

const Button = ({className, title}) =>{
  return(
    <button className={className}>{title}</button>
  )
}

const  StyledButton = styled(Button)`
  background-color: ${({theme})=>theme.color.default};
  border: none;
  font-size: 1rem;
  border-radius: .5rem;
  color: white;
  width: 100%;
  height: 2rem;
  text-align: center;

  &:hover{
    cursor: pointer;
  }
`

export default StyledButton