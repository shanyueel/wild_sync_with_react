import styled, { css } from "styled-components";

const Button = ({className, onClick, children, disabled, outlined, invisible, alert, alertOutlined}) =>{
  return(
    <button className={className} disabled={disabled} onClick={onClick}>{children}</button>
  )
}

const  StyledButton = styled(Button)`
  background-color: ${({theme})=>theme.color.default};
  border: none;
  font-size: 1rem;
  border-radius: .5rem;
  color: white;
  width: 100%;
  height: 2.25rem;
  text-align: center;
  font-weight: 700;

  &:hover{
    cursor: pointer;
  }

  &:disabled{
    color:${({theme})=>theme.backgroundColor.secondary};
    background-color: ${({theme})=>theme.backgroundColor.default};
    border: 1px solid ${({theme})=>theme.backgroundColor.secondary};
    cursor: default;

    &:hover{
      color:${({theme})=>theme.backgroundColor.secondary};
      background-color: ${({theme})=>theme.backgroundColor.default};
    }
  }

  ${(props)=> props.sm && css`
    height: 1.6rem;
    font-size: .8rem;
    width: fit-content;
    padding: 0 .5rem;
    font-weight: 700;
  `}

  ${(props) => props.outlined && css`
    background-color: transparent;
    border: 1.5px solid ${({theme})=>theme.color.default};
    color: ${({theme})=>theme.color.default};

    &:hover{
      color: white;
      background-color: ${({theme})=>theme.color.default};
    }
  `}

  ${(props) => props.alert && css`
    background-color: ${({theme})=>theme.color.alert};
  `}

  ${(props) => props.alertOutlined && css`
    background-color: transparent;
    border: 1.5px solid ${({theme})=>theme.color.alert};
    color: ${({theme})=>theme.color.alert};

    &:hover{
      color: white;
      background-color: ${({theme})=>theme.color.alert};
    }
  `}

  ${(props) => props.invisible && css`
    visibility: hidden;
  `}
`

export default StyledButton