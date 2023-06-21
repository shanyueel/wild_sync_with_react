import styled from "styled-components"

const UserPage = ({className}) => {
  return(
    <div className={className}>
      <h1>this is user page.</h1>
    </div>
  )
}

const StyledUserPage = styled(UserPage)`

`

export default StyledUserPage