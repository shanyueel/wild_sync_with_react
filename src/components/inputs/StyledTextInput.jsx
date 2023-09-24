import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import styled,{css} from "styled-components"

const TextInput = ({ className, title, placeholder, inputId, formContent, onFormChange, onBlur, wordLimit, warning, password }) => {
  const [warningContent, setWarningContent] = useState(warning) 
  const [textCount, setTextCount] = useState(formContent?.[inputId]?.length || 0)
  const textRef = useRef("")

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  const handleInputChange = () => {
    const inputValue = textRef?.current?.value
    setTextCount(inputValue?.length)

    if(inputValue?.length === 0){
      const newForm = {...formContent}
      delete newForm[inputId]
      onFormChange(newForm)
    }

    const newForm = {
      ...formContent,
      [inputId]: inputValue
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
      <div className="c-input-body">
        <input 
          id={inputId}
          ref={textRef}
          type={clsx({password:password},{text:!password})} 
          placeholder={placeholder} 
          onChange={ handleInputChange } 
          onBlur={onBlur}
          value={ formContent?.[inputId] || "" } 
          maxLength={wordLimit}
        />
        <span className="o-input-body__count">{`${textCount} / ${wordLimit}`}</span>
      </div>
    </div>
  )
}

const StyledTextInput = styled(TextInput)`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  .c-input-body{
    position: relative;
  }

  .o-input-body__count{
    display: none;
  }

  ${props=>props.wordLimit && css`

    input:focus{
      padding-right: 3.25rem;

      & ~ .o-input-body__count{
        position: absolute;
        top: 50%;
        right: .75rem;
        display: block;
        font-size: .75rem;
        color: ${({theme})=>theme.color.grey};
        transform: translate(0,-50%);
      }
    }
  `}

`

export default StyledTextInput