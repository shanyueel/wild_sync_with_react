import styled from "styled-components"

const TextInput = ({ className }) => {
  return(
    <input className={className} />
  )
}

const StyledTextInput = styled(TextInput)`
  
`

export default StyledTextInput