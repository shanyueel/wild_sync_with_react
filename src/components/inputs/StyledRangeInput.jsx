import { useRef, useState } from "react"
import styled, { css } from "styled-components"

const RangeInput = ({ className, title, inputId, minPlaceholder, maxPlaceholder, unit, formContent, onFormChange, warning }) => {
  const minRef = useRef(null)
  const maxRef = useRef(null)
  const [range, setRange] = useState(formContent[inputId]|| { min:null,max: null })

  const handleMinInput = () => {
      const newRange = { min: minRef.current.value, max:range?.max }
      const newForm = {
        ...formContent,
        [inputId]: newRange
      }
      setRange(newRange)
      onFormChange(newForm)
  }

  const handleMaxInput = () => {
      const newRange = { min: range?.min, max:maxRef.current.value }
      const newForm = {
        ...formContent,
        [inputId]: newRange
      }
      setRange(newRange)
      onFormChange(newForm)
  }

  return(
    <div className={className}>
      {title &&
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warning}</label>
        </div>
      }
      <div className="c-input-body">
        <div className="c-input-body__min-value">
          <input 
            type="number" 
            ref={minRef}
            name={inputId} 
            placeholder={minPlaceholder} 
            onChange={handleMinInput} 
            value={range?.min || ""} 
          />
        </div>
        <div className="o-input-body__connect-line">-</div>
        <div className="c-input-body__max-value">
          <input 
            type="number"
            ref={maxRef} 
            name={inputId} 
            placeholder={maxPlaceholder} 
            onChange={handleMaxInput} 
            value={range?.max || ""}
          />
        </div>
        <div className="o-input-body__unit">
          {unit}
        </div>

      </div>
    </div>
  )
}

const StyledRangeInput = styled(RangeInput)`
  width: 100%;

  .c-input-body{
    display: flex;
    align-items: center;
    gap: .5rem;

    &__min-value, 
    &__max-value{
      display: flex;
      align-items: center;
      gap:.5rem;

      input{
        max-width: 12.5rem;
      }
    }

    .o-input-body__unit{
      display: none;

      ${props=> props.unit && css`
        display: block;
        color: ${({theme})=>theme.color.default};
        font-weight: 700;
      `}
    }


  }
`

export default StyledRangeInput


/*

const TextInput = ({ className, title, placeholder, unit, inputId, formContent, onFormChange, warning, password, number }) => {
  


  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
      <div className="c-input-body">
        <input type={clsx({password:password},{text:!password},{number:number})} id={inputId} placeholder={placeholder} onChange={handleTextInput} />
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
      `}
    }

  }

`

export default StyledTextInput

*/