import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import clsx from 'clsx';

import StyledImageInput from 'components/inputs/StyledImageInput';
import StyledPeriodInput from 'components/inputs/StyledDateTimePeriodInput';
import StyledRadioInput from 'components/inputs/StyledRadioInput';
import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledLocationInput from 'components/inputs/StyledLocationInput';

import defaultImageURL from 'data/defaultImageURL.json';
import activityTypeOptions from 'data/activityTypeOptions.json';

const ActivityCreateStepOne = ({
  className,
  formContent,
  onFormChange,
  formErrors,
  setFormErrors,
}) => {
  const { t } = useTranslation(['activityPage', 'common']);

  const translatedActivityTypeOptions = useMemo(
    () =>
      activityTypeOptions.map((option) => ({
        ...option,
        name: t(`common:activityTypes.${option.id}`),
      })),
    [t]
  );

  useEffect(() => {
    const updatedErrors = { ...formErrors };
    if (formContent?.coverURL) updatedErrors.coverURL = '';
    if (formContent?.name) updatedErrors.name = '';
    if (formContent?.type) updatedErrors.type = '';
    if (formContent?.location) updatedErrors.location = '';
    if (formContent?.time?.start && formContent?.time?.end)
      updatedErrors.time = '';
    setFormErrors(updatedErrors);
  }, [formContent, formErrors, setFormErrors]);

  return (
    <div className={clsx(className, 'scrollbar')}>
      <StyledImageInput
        title={t('create.coverPhoto')}
        inputId="coverURL"
        defaultImgURL={defaultImageURL.activityCover}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.coverURL}
      />
      <StyledTextInput
        title={t('create.activityName')}
        inputId="name"
        placeholder={t('create.activityNamePlaceholder')}
        wordLimit={16}
        formContent={formContent}
        onFormChange={onFormChange}
        value={formContent.name || ''}
        warning={formErrors?.name}
      />
      <StyledRadioInput
        title={t('create.activityType')}
        inputId="type"
        radioOptions={translatedActivityTypeOptions}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.type}
      />
      <StyledLocationInput
        title={t('create.activityLocation')}
        inputId="location"
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.location}
      />
      <StyledPeriodInput
        title={t('create.activityPeriod')}
        inputId="time"
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.time}
      />
    </div>
  );
};

const StyledActivityCreateStepOne = styled(ActivityCreateStepOne)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export default StyledActivityCreateStepOne;
