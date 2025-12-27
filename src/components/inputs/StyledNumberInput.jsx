import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const NumberInput = ({
  className,
  inputId,
  title,
  placeholder,
  unit,
  minLimit,
  maxLimit,
  step,
  formContent,
  onFormChange,
  warning,
}) => {
  const numberRef = useRef(null);
  const [warningContent, setWarningContent] = useState(warning);

  useEffect(() => {
    const currentValue = Number(numberRef?.current?.value);

    if (!currentValue) delete formContent?.[inputId];
    let rangeLimitWarning = '';
    if (currentValue < minLimit || currentValue > maxLimit) {
      if (typeof minLimit !== 'undefined' && typeof maxLimit !== 'undefined') {
        rangeLimitWarning = `輸入數值應該介於： ${minLimit} - ${maxLimit}`;
      } else if (typeof minLimit !== 'undefined') {
        rangeLimitWarning = `輸入數值應該大於${minLimit}`;
      } else if (typeof maxLimit !== 'undefined') {
        rangeLimitWarning = `輸入數值應該小於${maxLimit}`;
      }
    } else {
      rangeLimitWarning = '';
    }

    setWarningContent(rangeLimitWarning || warning);
  }, [warning, formContent, inputId, minLimit, maxLimit]);

  const handleInputChange = () => {
    const currentValue = Number(numberRef?.current?.value);

    const newForm = {
      ...formContent,
      [inputId]: currentValue,
    };
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
        <input
          id={inputId}
          ref={numberRef}
          type="number"
          placeholder={placeholder}
          onChange={handleInputChange}
          value={formContent?.[inputId] || ''}
          step={step}
          min={minLimit}
          max={maxLimit}
        />
        <span className="o-input-body__unit">{unit}</span>
      </div>
    </div>
  );
};

const StyledNumberInput = styled(NumberInput)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .c-input-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    .o-input-body__unit {
      display: none;

      ${(props) =>
        props.unit &&
        css`
          display: block;
          color: ${({ theme }) => theme.color.default};
          font-weight: 700;
          white-space: nowrap;
        `}
    }
  }
`;

export default StyledNumberInput;
