import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import StyledRadioInput from 'components/inputs/StyledRadioInput';
import StyledRangeInput from 'components/inputs/StyledRangeInput';
import StyledDateTimeInput from 'components/inputs/StyledDateTimeInput';
import StyledTextArea from 'components/inputs/StyledTextArea';
import StyledNumberInput from 'components/inputs/StyledNumberInput';

import activityDifficultyOptions from 'data/activityDifficultyOptions.json';

const ActivityCreateStepTwo = ({
  className,
  formContent,
  onFormChange,
  formErrors,
  setFormErrors,
}) => {
  const { t } = useTranslation(['activityPage', 'common']);

  const translatedDifficultyOptions = useMemo(
    () =>
      activityDifficultyOptions.map((option) => ({
        ...option,
        name: t(`common:difficulties.${option.id}`),
      })),
    [t]
  );

  useEffect(() => {
    const updatedErrors = { ...formErrors };
    if (formContent?.difficulty) updatedErrors.difficulty = '';
    if (formContent?.activityTimeLength) updatedErrors.activityTimeLength = '';
    if (formContent?.cost) updatedErrors.cost = '';
    if (formContent?.attendanceLimit) updatedErrors.attendanceLimit = '';
    if (formContent?.deadline) updatedErrors.deadline = '';
    if (formContent?.introduction) updatedErrors.introduction = '';

    if (JSON.stringify(updatedErrors) !== JSON.stringify(formErrors))
      setFormErrors(updatedErrors);
  }, [formContent, formErrors, setFormErrors]);

  return (
    <div className={clsx(className, 'scrollbar')}>
      <StyledRadioInput
        title={t('create.difficulty')}
        inputId="difficulty"
        formContent={formContent}
        onFormChange={onFormChange}
        radioOptions={translatedDifficultyOptions}
        warning={formErrors?.difficulty}
      />
      <StyledNumberInput
        title={t('create.outdoorDuration')}
        inputId="activityTimeLength"
        placeholder={t('create.outdoorDurationPlaceholder')}
        unit={t('common:unit.hours')}
        minLimit={0}
        step={0.5}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.activityTimeLength}
      />
      <StyledRangeInput
        title={t('create.estimatedCost')}
        inputId="cost"
        minPlaceholder={t('create.minCost')}
        maxPlaceholder={t('create.maxCost')}
        unit="$"
        minLimit={0}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.cost}
      />
      <StyledNumberInput
        title={t('create.attendanceLimit')}
        inputId="attendanceLimit"
        placeholder={t('create.registrationLimitPlaceholder')}
        unit={t('common:unit.people')}
        minLimit={0}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.attendanceLimit}
      />
      <StyledDateTimeInput
        title={t('create.deadline')}
        inputId="deadline"
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.deadline}
      />
      <StyledTextArea
        title={t('create.introduction')}
        placeholder={t('create.introductionPlaceholder')}
        inputId="introduction"
        wordLimit={100}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.introduction}
      />
    </div>
  );
};

const StyledActivityCreateStepTwo = styled(ActivityCreateStepTwo)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export default StyledActivityCreateStepTwo;
