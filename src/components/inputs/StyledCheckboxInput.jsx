import clsx from "clsx";
import { useState } from "react";
import styled from "styled-components";

const CheckboxInput = ({className, title, inputId, checkboxOptions, formContent, onFormChange, warningContent}) => {
  const [checkedList, setCheckedList] = useState(formContent?.[inputId] || [])

  const handleCheckboxChange = (e) => {
    let newCheckedList = checkedList

    if(checkedList.includes(e.target.value)){
      newCheckedList = checkedList.filter(option=> option !== e.target.value)
    }else{
      newCheckedList = [
        ...checkedList,
        e.target.value
      ]
    }
    const newForm = {
      ...formContent,
      [inputId]: newCheckedList
    }
    setCheckedList(newCheckedList)
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      {title &&
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }
      <div className="l-checkbox-options">
        {checkboxOptions?.map(checkboxOption =>{
          return(
            <div key={checkboxOption.id} className={clsx("c-checkbox-option",{"--disabled":checkboxOption.disabled}) }>
              <input
                type="checkbox" 
                name={inputId} 
                value={checkboxOption.id} 
                onChange={handleCheckboxChange} 
                checked={checkedList?.includes(checkboxOption?.id)} 
                disabled={checkboxOption.disabled} 
              />
              <label htmlFor={checkboxOption.id}>{checkboxOption.name}</label>
            </div>
          )
        })}
      </div>

    </div>
  )
}

const StyledCheckboxInput = styled(CheckboxInput)`
  width: 100%;

  .l-checkbox-options{
    display: flex;
    flex-wrap: wrap;
    padding: .25rem;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;

    .c-checkbox-option{
      display: flex;
      align-items: center;
      width: fit-content

      label{
        white-space: nowrap;
        margin-left: .25rem;
      }

      &.--disabled{
        opacity: 0.25;
      }

      &:last-child{
        margin-right: auto;
      }

    }
  }

  @media screen and (min-width: 480px) {
    .l-checkbox-options{
      justify-content: flex-start;
      gap: 1.5rem;
    }
  }

`

export default StyledCheckboxInput