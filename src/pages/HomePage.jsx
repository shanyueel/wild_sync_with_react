import StyledNavbar from "components/StlyedNavbar"
import StyledFooter from "components/StyledFooter"
import { Fragment } from "react"
import styled from "styled-components"

const HomePage = ({className}) => {
  return(
    <Fragment className={className}>
      <StyledNavbar/ >
      <div className="l-web-container">
        
      </div>
      <StyledFooter/ >
    </Fragment>
  )
}

const StyledHomePage = styled(HomePage)`
`

export default StyledHomePage