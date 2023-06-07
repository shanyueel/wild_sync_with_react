import styled from "styled-components"

const TextInput = ({ className,title,placeholder }) => {
  const warning = "";
  
  return(
    <div className={className}>
      <div className="c-input-labels">
        <label className="o-input-title">{title}</label>
        <label className="o-input-warning">{warning}</label>
      </div>

      <input placeholder={placeholder} />
    </div>

  )
}

const StyledTextInput = styled(TextInput)`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  .c-input-labels{
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    margin-bottom: .25rem;

    label{
      color: ${({theme})=> theme.color.default};
      font-weight: 500;
    }

    .o-input-warning{
      color: ${({theme})=> theme.color.alert}
    }
  }


  input{
    height: 2.25rem;
    width: 100%;
    margin-top: .5rem;
    padding: .2rem .75rem;
    border: 1px solid ${({theme})=> theme.color.default};
    border-radius: .5rem;
    font-size: 1rem;

    &:hover{
      border: 2px solid ${({theme})=> theme.color.default};
    }
  }

`

export default StyledTextInput