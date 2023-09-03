import { useState } from "react";
import styled from "styled-components";
import { DateTimePicker } from "@mui/x-date-pickers";

const DateTimePeriodInput = ({className, title, inputId, formContent, onFormChange, warning }) => {
  const [period,setPeriod] = useState(formContent[inputId] || {start: null, end: null})
  const [warningContent, setWarningContent] = useState(warning)

  const handleStartInput = (newDate) => {
    const newDateTimeStamp = Number(Date.parse(newDate))

    if(period?.end && newDateTimeStamp > period?.end){
      setWarningContent("開始時間不可在結束時間之後")
      const newPeriod = {start:null, end:period?.end}
      setPeriod(newPeriod)
      return
    }else{
      setWarningContent("")
      const newPeriod = {start:newDateTimeStamp, end:period?.end}
      const newForm = {
        ...formContent,
        [inputId]: newPeriod
      }
      setPeriod(newPeriod)
      onFormChange(newForm)
    }
  }

  const handleEndInput = (newDate) => {
    const newDateTimeStamp = Number(Date.parse(newDate))

    if(period?.start && newDateTimeStamp < period?.start){
     setWarningContent("結束時間不可在開始時間之前")
      const newPeriod = { start:period?.start, end: null }
      const newForm = {
        ...formContent,
        [inputId]: newPeriod
      }
      setPeriod(newPeriod)
      onFormChange(newForm)
      return
    }else{
      setWarningContent("")
      const newPeriod = { start: period?.start, end: newDateTimeStamp}
      const newForm = {
        ...formContent,
        [inputId]: newPeriod
      }
      setPeriod(newPeriod)
      onFormChange(newForm)
    }
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
        <DateTimePicker
          className="c-input-body__date-picker"
          disablePast
          maxDate={period?.end}
          value={period?.start} 
          onChange={handleStartInput}
        />
        <div className="o-input-body__connect-line">-</div>
        
        <DateTimePicker 
          className="c-input-body__date-picker" 
          disablePast
          minDate={period?.start}
          value={period?.start} 
          onChange={handleEndInput}
        />
      </div>
    </div>
  )
}

const StyledDateTimePeriodInput = styled(DateTimePeriodInput)`
  .c-input-body{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
  }

  @media screen and (min-width: 480px) {
    .c-input-body{
      justify-content: space-between;
    }
  }
`

export default StyledDateTimePeriodInput