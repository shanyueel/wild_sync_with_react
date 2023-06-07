import styled from "styled-components";
import Calendar from "react-calendar";
import { useState } from "react";


const PeriodSelector = ({className}) => {
   const [selectedRange, setSelectedRange] = useState([null, null]);

  const handleCalendarChange = (date) => {
    if (selectedRange[0] && !selectedRange[1]) {
      // 如果已选择了一个日期，但尚未选择第二个日期，则选择第二个日期
      setSelectedRange([selectedRange[0], date]);
      console.log(selectedRange)
    } else {
      // 如果没有选择日期或者已经选择了两个日期，则重新选择日期范围
      setSelectedRange([date, null]);
      console.log(selectedRange)
    }

    
  }
  
  return(
    <div className={className}>
      <Calendar
        className="o-calendar" 
        returnValue="range"
        selectRange={true}
        tileClassName="o-calender__tile"
        hover={new Date(2017, 0, 1)}
        onChange={handleCalendarChange}
      />
    </div>
  )
}

const StyledPeriodSelector = styled(PeriodSelector)`

.react-calendar {
  max-width: 25rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  margin: 0 auto;
}

.react-calendar--doubleView {
  width: 700px;
}

.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}

.react-calendar--doubleView .react-calendar__viewContainer>* {
  width: 50%;
  margin: 0.5em;
}

.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}

.react-calendar button:enabled:hover {
  cursor: pointer;
}

.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
}

.react-calendar__navigation button {
  min-width: 44px;
  background: none;
}

.react-calendar__navigation button:disabled {
  background-color: #f0f0f0;
}

.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
}

.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
}

.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}

.react-calendar__month-view__days__day--neighboringMonth {
  color: #757575;
}

.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}

.react-calendar__tile {
  max-width: 100%;
  padding: 10px 6.6667px;
  background: none;
  text-align: center;
  line-height: 16px;
}

.react-calendar__tile:disabled {
  background-color: #f0f0f0;
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: ${({theme})=>theme.color.default};
}

.react-calendar__tile--now {
  background: ${({theme})=>theme.backgroundColor.secondary};
}

.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: ${({theme})=>theme.color.default};
}

.react-calendar__tile--hasActive {
  background: ${({theme})=>theme.color.secondary};
}

.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: ${({theme})=>theme.color.default};
}

.react-calendar__tile--active {
  background: ${({theme})=>theme.color.secondary};
  color: white;
}

.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: ${({theme})=>theme.color.default};
}

.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}
`

export default StyledPeriodSelector