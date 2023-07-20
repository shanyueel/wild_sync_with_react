import { useState } from "react";
import styled from "styled-components";

const PeriodInput = ({className, title, inputName, minInputId, maxInputId, formContent, onFormChange, warning }) => {
  const [period, setPeriod] = useState(formContent[inputName] || [undefined,undefined])

  const handleTextInput = (e) => {
    let newPeriod;

    if(e.target.id === minInputId){
      newPeriod = [ e.target.value, period[1] ]
    }else if(e.target.id === maxInputId){
      newPeriod = [ period[0], e.target.value ]
    }

    setPeriod(newPeriod)

    onFormChange({
      ...formContent,
      [inputName]: newPeriod
    })
  }

  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
      <div className="c-input-body">
        <input type="datetime-local" id={minInputId} name={inputName} onChange={handleTextInput} value={ period[0] || "" }/>
        <div className="">-</div>
        <input type="datetime-local" id={maxInputId} name={inputName} onChange={handleTextInput} value={ period[1] || "" }/>
      </div>
    </div>
  )
}

const StyledPeriodInput = styled(PeriodInput)`
  .c-input-body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
  }

  @media screen and (min-width: 480px) {
    .c-input-body{
      justify-content: start;

      input{
        max-width: 12.5rem;
      }
    }
  }
`

export default StyledPeriodInput