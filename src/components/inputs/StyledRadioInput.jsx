import styled from "styled-components";

const RadioInput = ({className, title, radioOptions, formContent, onFormChange}) => {

  const handleRadioChange = (e) => {
    const newForm = {
      ...formContent,
      [e.target.name]: e.target.id
    }
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      <h3 className="o-radio-title c-input-title">{title}</h3>
      <div className="l-radio-options">
        {radioOptions.map(radioOption =>{
          return(
            <div key={radioOption.id} className="c-radio-option">
              <input id={radioOption.id} name={radioOption.name} type="radio" onChange={handleRadioChange} checked={radioOption.id===formContent[radioOption.name]} required />
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
    width: 100%;
    margin-top: .5rem;

    .c-radio-option{
      display: flex;
      align-items: center;

      label{
        white-space: nowrap;
        margin-left: .25rem;
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