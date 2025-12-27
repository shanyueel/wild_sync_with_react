import styled from 'styled-components';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import StyledHikingTable from 'components/tables/StyledHikingTable';

const ActivityCreateStepThree = ({
  className,
  formContent,
  onFormChange,
  formErrors,
  setFormErrors,
}) => {
  const [detailContent, setDetailContent] = useState(formContent?.detail || {});

  const checkIsStepThreeComplete = () => {
    const updatedFormErrors = { ...formErrors };
    if (formContent?.detail?.departurePoint)
      updatedFormErrors.departurePoint = '';
    if (formContent?.detail?.trackType) updatedFormErrors.trackType = '';
    if (formContent?.detail?.exitPoint) updatedFormErrors.exitPoint = '';
    if (formContent?.detail?.trackLength) updatedFormErrors.trackLength = '';
    if (formContent?.detail?.altitude) updatedFormErrors.altitude = '';
    if (formContent?.detail?.trackCondition)
      updatedFormErrors.trackCondition = '';
    if (formContent?.detail?.belongingPark)
      updatedFormErrors.belongingPark = '';
    if (formContent?.detail?.applicationNeeded)
      updatedFormErrors.applicationNeeded = '';
    if (formContent?.detail?.trackIntroduction)
      updatedFormErrors.trackIntroduction = '';
    if (formContent?.detail?.mapURL) updatedFormErrors.mapURL = '';
    setFormErrors(updatedFormErrors);
  };

  useEffect(() => {
    const newForm = {
      ...formContent,
      detail: detailContent,
    };
    onFormChange(newForm);
  }, [detailContent]);

  useEffect(() => {
    checkIsStepThreeComplete();
  }, [formContent?.detail]);

  return (
    <StyledHikingTable
      inputUsed
      className={clsx(className, 'scrollbar')}
      detailContent={detailContent}
      onDetailChange={setDetailContent}
      formErrors={formErrors}
    />
  );
};

const StyledActivityCreateStepThree = styled(ActivityCreateStepThree)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export default StyledActivityCreateStepThree;
