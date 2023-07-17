import styled from "styled-components";

const DateTimeInput = ({className, title, inputId, formContent, onFormChange, warning }) => {

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
        <input type="datetime-local" id={inputId} onChange={handleTextInput} value={ formContent[inputId] || "" } />
      </div>
    </div>
  )
}

const StyledDateTimeInput = styled(DateTimeInput)`

`

export default StyledDateTimeInput