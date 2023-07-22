import styled,{css} from "styled-components"
import clsx from "clsx"

const TextInput = ({ className, title, placeholder, unit, inputId, formContent, onFormChange, warning, password, numberUsed }) => {
  
  const handleTextInput = (e) => {

    onFormChange({
      ...formContent,
      [e.target.id]: e.target.value
    })

  }

  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
      <div className="c-input-body">
        <input 
          id={inputId}
          type={clsx({password:password},{text:!password && !numberUsed},{number:numberUsed})} 
          placeholder={placeholder} 
          onChange={ handleTextInput } 
          value={ formContent[inputId] || "" } 
        />
        <span className="o-input-body__unit">{unit}</span>
      </div>
    </div>
  )
}

const StyledTextInput = styled(TextInput)`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  .c-input-title{
    display: flex;
    justify-content: space-between;
    font-size: 1rem;

    label{
      color: ${({theme})=> theme.color.default};
      font-weight: 700;
    }

    .o-input-title__warning{
      color: ${({theme})=> theme.color.alert};
      font-weight: 400;
    }
  }

  .c-input-body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;

    .o-input-body__unit{
      display: none;

      ${props=> props.unit && css`
        display: block;
        color: ${({theme})=>theme.color.default};
        font-weight: 700;
        white-space: nowrap;
      `}
    }

  }

`

export default StyledTextInput