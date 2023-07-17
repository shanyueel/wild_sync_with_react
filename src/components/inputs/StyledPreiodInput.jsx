import styled from "styled-components";

const PeriodInput = ({className, title, inputName, minInputId, maxInputId, formContent, onFormChange, warning }) => {

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
        <input type="datetime-local" id={minInputId} name={inputName} onChange={handleTextInput} value={ formContent[minInputId] || "" } />
        <div className="">-</div>
        <input type="datetime-local" id={maxInputId} name={inputName} onChange={handleTextInput} value={ formContent[maxInputId] || "" } />
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
`

export default StyledPeriodInput