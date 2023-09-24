import { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"

const TextArea = ({ className, title, placeholder, inputId, formContent, onFormChange, wordLimit, warning }) => {
  const textRef = useRef(null)
  const [warningContent, setWarningContent] = useState(warning)
  const [textCount, setTextCount] = useState(formContent?.[inputId]?.length || 0)

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  const handleTextArea = () => {
    const inputValue = textRef?.current?.value
    setTextCount(inputValue?.length)
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
        <textarea 
          id={inputId}
          ref={textRef} 
          placeholder={placeholder} 
          onChange={handleTextArea} 
          value={formContent?.[inputId] || ""} 
          maxLength={wordLimit}
        />
        <span className="o-input-body__count">{`${textCount} / ${wordLimit}`}</span>
      </div>

    </div>
  )
}

const StyledTextArea = styled(TextArea)`
  display: flex;
  flex-direction: column;
  width: 100%;

  textarea{
    height: 7.5rem;
  }

  .c-input-body{
    position: relative;

    .o-input-body__count{
      display: none;
    }
  }

  @media screen and (min-width: 1024px) {
    textarea{
      height: 6.75rem;
    }
  }

  ${props=>props.wordLimit && css`
    textarea:focus{
      padding-bottom: 1rem;

      & ~ .o-input-body__count{
        display: block;
        position: absolute;
        bottom: 1rem;
        right: .75rem;
        font-size: .75rem;
        transform: translate(0, 50%);
      }
    }
  `}

`

export default StyledTextArea