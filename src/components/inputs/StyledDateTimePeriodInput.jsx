import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTimePicker } from '@mui/x-date-pickers';

const DateTimePeriodInput = ({
  className,
  title,
  inputId,
  formContent,
  onFormChange,
  warning,
}) => {
  const [period, setPeriod] = useState({ start: null, end: null });
  const [warningContent, setWarningContent] = useState(warning);

  useEffect(() => {
    setWarningContent(warning);
  }, [warning]);

  useEffect(() => {
    setPeriod(formContent?.[inputId] || { start: null, end: null });
  }, [formContent, inputId]);

  const handleDateChange = (newDate, field) => {
    const newDateTimeStamp = Number(Date.parse(newDate));
    const updatedPeriod = { ...period, [field]: newDateTimeStamp };
    const newForm = { ...formContent, [inputId]: updatedPeriod };

    if (
      field === 'start' &&
      updatedPeriod.end &&
      newDateTimeStamp > updatedPeriod.end
    ) {
      setWarningContent('開始時間不可在結束時間之後');
      updatedPeriod.start = null;
    } else if (
      field === 'end' &&
      updatedPeriod.start &&
      newDateTimeStamp < updatedPeriod.start
    ) {
      setWarningContent('結束時間不可在開始時間之前');
      updatedPeriod.end = null;
    } else {
      setWarningContent('');
    }

    setPeriod(updatedPeriod);
    onFormChange(newForm);
  };

  return (
    <div className={className}>
      {(title || warningContent) && (
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      )}
      <div className="c-input-body">
        <DateTimePicker
          className="c-input-body__date-picker"
          disablePast
          maxDate={period.end}
          value={period.start}
          onChange={(newDate) => handleDateChange(newDate, 'start')}
        />
        <div className="o-input-body__connect-line">-</div>

        <DateTimePicker
          className="c-input-body__date-picker"
          disablePast
          minDate={period.start}
          value={period.end}
          onChange={(newDate) => handleDateChange(newDate, 'end')}
        />
      </div>
    </div>
  );
};

const StyledDateTimePeriodInput = styled(DateTimePeriodInput)`
  .c-input-body {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  @media screen and (min-width: 480px) {
    .c-input-body {
      justify-content: space-between;
    }
  }
`;

export default StyledDateTimePeriodInput;
