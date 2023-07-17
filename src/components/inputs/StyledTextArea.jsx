import styled from "styled-components"

const TextArea = ({ className, title, placeholder, inputId, formContent, onFormChange, warning }) => {
  
  const handleTextArea = (e) => {

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
      <textarea 
        id={inputId} 
        placeholder={placeholder} 
        onChange={handleTextArea} 
        value={formContent[inputId] || ""} />
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