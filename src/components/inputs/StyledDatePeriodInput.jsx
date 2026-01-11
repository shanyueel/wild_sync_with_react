import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers';

const DatePeriodInput = ({
  className,
  title,
  inputId,
  formContent,
  onFormChange,
  warning,
}) => {
  const { t } = useTranslation('common');
  const [period, setPeriod] = useState(
    formContent?.[inputId] || { start: null, end: null }
  );
  const [warningContent, setWarningContent] = useState(warning);

  const handleStartInput = (newDate) => {
    const newDateStamp = Number(Date.parse(newDate));

    if (period?.end && newDateStamp > period?.end) {
      setWarningContent(t('dateTimeInput.errorStart'));
      const newPeriod = { start: null, end: period?.end };
      setPeriod(newPeriod);
      return;
    } else {
      setWarningContent('');
      const newPeriod = {
        start: newDateStamp,
        end: period?.end || newDateStamp + 86399000,
      };
      const newForm = {
        ...formContent,
        [inputId]: newPeriod,
      };
      setPeriod(newPeriod);
      onFormChange(newForm);
    }
  };

  const handleEndInput = (newDate) => {
    const newDateStamp = Number(Date.parse(newDate)) + 86399000;

    if (period?.start && newDateStamp < period?.start) {
      setWarningContent(t('dateTimeInput.errorEnd'));
      const newPeriod = { start: period?.start, end: null };
      setPeriod(newPeriod);
      return;
    } else {
      setWarningContent('');
      const newPeriod = {
        start: period?.start || newDateStamp - 86399000,
        end: newDateStamp,
      };
      const newForm = {
        ...formContent,
        [inputId]: newPeriod,
      };
      setPeriod(newPeriod);
      onFormChange(newForm);
    }
  };

  return (
    <div className={className}>
      {title && (
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      )}
      <div className="c-input-body">
        <DatePicker
          className="c-input-body__date-picker"
          disablePast
          maxDate={period?.end || null}
          value={period?.start || null}
          onChange={handleStartInput}
        />
        -
        <DatePicker
          className="c-input-body__date-picker"
          disablePast
          minDate={period?.start || null}
          value={period?.end || null}
          onChange={handleEndInput}
        />
      </div>
    </div>
  );
};

const StyledDatePeriodInput = styled(DatePeriodInput)`
  .c-input-body {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* .react-calendar {
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
  background-color: ${({ theme }) => theme.color.default};
}

.react-calendar__tile--now {
  background: ${({ theme }) => theme.backgroundColor.secondary};
}

.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: ${({ theme }) => theme.color.default};
}

.react-calendar__tile--hasActive {
  background: ${({ theme }) => theme.color.secondary};
}

.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: ${({ theme }) => theme.color.default};
}

.react-calendar__tile--active {
  background: ${({ theme }) => theme.color.secondary};
  color: white;
}

.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: ${({ theme }) => theme.color.default};
}

.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
} */
`;

export default StyledDatePeriodInput;
