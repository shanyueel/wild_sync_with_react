import styled from "styled-components";
import { useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";

const DateInput = ({className, title, inputId, formContent, onFormChange, disablePast, disableFuture, warning }) => {
  const [date, setDate] = useState(formContent?.[inputId] || null)
  const [warningContent, setWarningContent] = useState(warning)
  
  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  const handleDateInput = (newDate) => {
    const newDateString = Date.parse(newDate)

    const newForm = {
      ...formContent,
      [inputId]: newDateString,
    }
    setDate(newDateString)
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      {( title || warningContent ) &&
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }
      <div className="c-input-body">
        <DatePicker
          className="c-input-body__date-picker"
          disablePast={disablePast}
          disableFuture={disableFuture}
          value={date} 
          onChange={handleDateInput}
        />
      </div>
    </div>
  )
}

const StyledDateInput = styled(DateInput)`

`

export default StyledDateInput