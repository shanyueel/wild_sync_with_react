import styled from "styled-components";

const RadioInput = ({className, title, radioOptions, FormContent, onFormChange}) => {

  const handleRadioChange = (e) => {

    onFormChange({
      ...FormContent,
      [e.target.name]: e.target.id
    })

  }

  return(
    <div className={className}>
      <h3 className="o-radio-title input-title">{title}</h3>
      <div className="l-radio-options">
        {radioOptions.map(radioOption =>{
          return(
            <div key={radioOption.id} className="c-radio-option">
              <input id={radioOption.id} name={radioOption.name} type="radio" onChange={handleRadioChange} required />
              <label htmlFor={radioOption.id}>{radioOption.label}</label>
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
    .c-radio-option{
      display: flex;
      align-items: center;
      label{
        margin-left: .25rem;
      }
    }
  }

`

export default StyledRadioInput