import clsx from "clsx";
import styled from "styled-components";
import { useEffect, useState } from "react";

const RadioInput = ({className, title, inputId, radioOptions, formContent, onFormChange, warning}) => {
  const [warningContent, setWarningContent] = useState(warning) 

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  const handleRadioChange = (e) => {
    const newForm = {
      ...formContent,
      [inputId]: e.target.value
    }
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      {
        ( title || warningContent ) && 
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }
      <div className="l-radio-options">
        {radioOptions.map(radioOption =>{
          return(
            <div key={radioOption.id} className={clsx("c-radio-option",{"--disabled":radioOption.disabled}) }>
              <input
                id={radioOption.id}
                type="radio" 
                name={inputId}
                value={radioOption.id}  
                onChange={handleRadioChange} 
                checked={radioOption.id===formContent?.[inputId]} 
                disabled={radioOption.disabled} 
              />
              <label htmlFor={radioOption.id}>{radioOption.name}</label>
            </div>
          )
        })}
      </div>

    </div>
  )
}

const StyledRadioInput = styled(RadioInput)`
  
  .l-radio-options{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: .5rem;

    .c-radio-option{
      display: flex;
      align-items: center;

      label{
        white-space: nowrap;
        margin-left: .25rem;
      }

      &.--disabled{
        opacity: 0.25;
      }

    }
  }

  @media screen and (min-width: 480px) {
    .l-radio-options{
      justify-content: flex-start;
      gap: 1.5rem;
    }
  }

`

export default StyledRadioInput