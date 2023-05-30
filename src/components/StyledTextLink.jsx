import styled from "styled-components";
import { Link } from "react-router-dom";

const TextLink = ({ className, text, destination }) => {
  return(
    <Link to={destination} className={className}>{text}</Link>
  )
}

const StyledTextLink = styled(TextLink)`
  color: white;

  &:hover{
    text-shadow: 0 0 1.5px white;
  }
`

export default StyledTextLink