import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import styled from "styled-components";

const DateInput = ({className, title, inputId, formContent, onFormChange, warning, disablePast, disableFuture }) => {
  const [date, setDate] = useState(formContent[inputId] || null)
  
  const handleDateInput = (newDate) => {
    const newForm = {
      ...formContent,
      [inputId]: newDate,
    }
    setDate(newDate)
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
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