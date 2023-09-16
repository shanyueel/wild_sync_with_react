import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import styled,{css} from "styled-components"

const TextInput = ({ className, title, placeholder, unit, inputId, formContent, onFormChange, onBlur, wordLimit, warning, password, numberUsed }) => {
  const [warningContent, setWarningContent] = useState(warning) 
  const textRef = useRef(null)
  const handleTextInput = () => {
    const newForm = {
      ...formContent,
      [inputId]: textRef?.current?.value
    }
    onFormChange(newForm)
  }

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  useEffect(()=>{
    if(wordLimit && textRef?.current?.value?.length > wordLimit){
      setWarningContent(`超過字數上限: ${wordLimit}字`)
      const newForm = {
        ...formContent,
        [inputId]: textRef?.current?.value?.slice(0, wordLimit)
      }
      onFormChange(newForm)
    }else{
      setWarningContent("")
    }
  },[wordLimit, textRef?.current?.value])

  return(
    <div className={className}>
      {title && 
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }
      <div className="c-input-body">
        <input 
          id={inputId}
          ref={textRef}
          type={clsx({password:password},{text:!password && !numberUsed},{number:numberUsed})} 
          placeholder={placeholder} 
          onChange={ handleTextInput } 
          onBlur={onBlur}
          value={ formContent?.[inputId] || "" } 
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