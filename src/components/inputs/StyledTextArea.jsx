import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const TextArea = ({ className, title, placeholder, inputId, formContent, onFormChange, wordLimit, warning }) => {
  const textRef = useRef(null)
  const [warningContent, setWarningContent] = useState(warning) 

  const handleTextArea = () => {
    const newForm = {
      ...formContent,
      [inputId]: textRef?.current?.value    
    }
    onFormChange(newForm)
  }

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
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warningContent}</label>
      </div>
      <textarea 
        id={inputId}
        ref={textRef} 
        placeholder={placeholder} 
        onChange={handleTextArea} 
        value={formContent?.[inputId] || ""} />
    </div>
  )
}

const StyledTextArea = styled(TextArea)`
  display: flex;
  flex-direction: column;
  width: 100%;

  textarea{
    height: 5.5rem;
  }

`

export default StyledTextArea