import { useState } from "react";
import styled from "styled-components";
import { DateTimePicker } from "@mui/x-date-pickers";

const PeriodInput = ({className, title, inputName, formContent, onFormChange, warning }) => {
  const [period,setPeriod] = useState(formContent[inputName]||[null,null])

  const handleStartInput = (newDate) => {
    const newPeriod = [newDate, period[1]]
    const newForm = {
      ...formContent,
      [inputName]: newPeriod
    }
    setPeriod(newPeriod)
    onFormChange(newForm)
  }

  const handleEndInput = (newDate) => {
    const newPeriod = [period[0], newDate]
    const newForm = {
      ...formContent,
      [inputName]: newPeriod
    }
    setPeriod(newPeriod)
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
      <div className="c-input-body">
        <DateTimePicker
          className="c-input-body__date-picker"
          disablePast
          value={period[0]} 
          onChange={handleStartInput}
        />
        <div className="o-input-body__connect-line">-</div>
        
        <DateTimePicker 
          className="c-input-body__date-picker" 
          disablePast
          value={period[1]} 
          onChange={handleEndInput}
        />
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

  @media screen and (min-width: 480px) {
    .c-input-body{
      justify-content: start;
    }
  }
`

export default StyledPeriodInput