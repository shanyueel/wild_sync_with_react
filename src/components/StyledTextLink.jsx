import styled, {css} from "styled-components";
import { Link } from "react-router-dom";

const TextLink = ({ className, text, destination }) => {
  return(
    <Link to={destination} className={className}>{text}</Link>
  )
}

const StyledTextLink = styled(TextLink)`
  font-size: 1.25rem;
  color: white;

  &:hover{
    text-shadow: 0 0 1.5px white;
  }

  ${props=>
    props.sm && css`
      font-size: 1rem;
    `
  }
`

export default StyledTextLink