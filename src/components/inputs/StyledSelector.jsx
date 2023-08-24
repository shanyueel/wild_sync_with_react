import styled from "styled-components";

const Selector = ({className, title, selectorId, optionList, defaultValue, formContent, onFormChange, warningContent}) => {
  
  const handleSelectorChange = (e) => {
    const newForm = {
      ...formContent,
      [selectorId]: e.target.value
    }
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
      <div className="c-input-body">
        <select className="c-input-selector" name={selectorId} value={defaultValue} onChange={handleSelectorChange}>
          { optionList?.map(option=><option key={option?.id} value={option?.id}>{option?.name}</option>) }
        </select>
      </div>
    </div>
  )
}

const StyledSelector = styled(Selector)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default StyledSelector