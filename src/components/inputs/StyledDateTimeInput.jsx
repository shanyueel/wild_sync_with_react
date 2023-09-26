import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DateTimeInput = ({className, title, inputId, formContent, onFormChange, warning }) => {
  const [date, setDate] = useState(formContent?.[inputId] || null)
  const [warningContent, setWarningContent] = useState(warning)

  useEffect(()=>{
    setDate(formContent?.[inputId] || null)
  },[formContent, inputId])

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  const handleDateTimeInput = (newDate) => {
    const newDateTimeString = Date.parse(newDate)
    if(newDateTimeString <= Date.parse(new Date())){
      setWarningContent("輸入時間不可為過去時間")
    }else{
      setWarningContent("")
    }

    const newForm = {
      ...formContent,
      [inputId]: newDateTimeString,
    }
    setDate(newDateTimeString)
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      { 
        (title || warningContent) &&
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }
      <div className="c-input-body">
        <DateTimePicker
          className="c-input-body__date-picker"
          disablePast
          value={date} 
          onChange={handleDateTimeInput}
        />
      </div>
    </div>
  )
}

const StyledDateTimeInput = styled(DateTimeInput)`
  
`

export default StyledDateTimeInput