import styled from 'styled-components';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { transferTimestamp } from 'utils/date-fns';
import { displayLocation } from 'utils/location';

import StyledTextInput from '../inputs/StyledTextInput';
import StyledTextArea from '../inputs/StyledTextArea';
import StyledDateInput from '../inputs/StyledDateInput';
import StyledLocationInput from 'components/inputs/StyledLocationInput';

const AccommodationTable = ({
  className,
  inputUsed,
  accommodationDay,
  accommodationIndex,
  accommodationList,
  onAccommodationListChange,
  formErrors,
}) => {
  const { t, i18n } = useTranslation(['tables', 'common']);
  const [accommodationDetail, setAccommodationDetail] =
    useState(accommodationDay);

  useEffect(() => {
    if (accommodationIndex || accommodationList || onAccommodationListChange) {
      accommodationList.splice(accommodationIndex, 1, accommodationDetail);
      const newAccommodationList = [...accommodationList];
      onAccommodationListChange(newAccommodationList);
    }
  }, [
    accommodationDetail,
    accommodationIndex,
    accommodationList,
    onAccommodationListChange,
  ]);

  return (
    <div className={className}>
      <table>
        <tbody>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('accommodationDate')}
            </td>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledDateInput
                  inputId="date"
                  formContent={accommodationDetail}
                  onFormChange={setAccommodationDetail}
                  warning={
                    formErrors?.accommodation?.[accommodationIndex]?.date
                  }
                />
              ) : (
                transferTimestamp(accommodationDetail?.date, t('dateFormat'))
              )}
            </td>
          </tr>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('accommodationName')}
            </td>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledTextInput
                  placeholder={t('accommodationPlaceholder')}
                  inputId="name"
                  formContent={accommodationDetail}
                  onFormChange={setAccommodationDetail}
                  warning={
                    formErrors?.accommodation?.[accommodationIndex]?.name
                  }
                />
              ) : (
                accommodationDetail?.name
              )}
            </td>
          </tr>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('accommodationAddress')}
            </td>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledLocationInput
                  detailed
                  inputId="address"
                  formContent={accommodationDetail}
                  onFormChange={setAccommodationDetail}
                  warning={
                    formErrors?.accommodation?.[accommodationIndex]?.address
                  }
                />
              ) : (
                displayLocation(accommodationDetail?.address, t, i18n)
              )}
            </td>
          </tr>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('roomPriceInfo')}
            </td>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledTextArea
                  placeholder={t('roomTypePrice')}
                  inputId="roomDetail"
                  wordLimit={150}
                  formContent={accommodationDetail}
                  onFormChange={setAccommodationDetail}
                  warning={
                    formErrors?.accommodation?.[accommodationIndex]?.roomDetail
                  }
                />
              ) : (
                accommodationDetail?.roomDetail
              )}
            </td>
          </tr>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('accommodationNotes')}
            </td>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledTextArea
                  placeholder={t('otherNotes')}
                  inputId="notes"
                  wordLimit={100}
                  formContent={accommodationDetail}
                  onFormChange={setAccommodationDetail}
                  warning={
                    formErrors?.accommodation?.[accommodationIndex]?.notes
                  }
                />
              ) : (
                accommodationDetail?.notes || '-'
              )}
            </td>
          </tr>
          <tr className="c-table-divide"></tr>
        </tbody>
      </table>
    </div>
  );
};

const StyledAccommodationTable = styled(AccommodationTable)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .o-activity-table__content {
    background-color: white;
    white-space: pre-wrap;
  }

  .o-activity-table__divide {
    height: 0.5rem;
    padding: 0;
  }
`;

export default StyledAccommodationTable;
