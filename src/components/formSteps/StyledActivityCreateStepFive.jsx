import styled from 'styled-components';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import StyledOthersTable from 'components/tables/StyledOthersTable';

const ActivityCreateStepFive = ({
  className,
  formContent,
  onFormChange,
  formErrors,
  setFormErrors,
}) => {
  const [detailContent, setDetailContent] = useState(formContent?.detail || {});

  const checkIsStepFiveComplete = () => {
    const updatedFormErrors = { ...formErrors };
    if (formContent?.detail?.schedule) updatedFormErrors.schedule = '';
    setFormErrors(updatedFormErrors);
  };

  useEffect(() => {
    const updateForm = () => {
      const newForm = {
        ...formContent,
        detail: detailContent,
      };
      onFormChange(newForm);
    };
    updateForm();
  }, [detailContent]);

  useEffect(() => {
    checkIsStepFiveComplete();
  }, [formContent?.detail]);

  return (
    <div className={clsx(className, 'scrollbar')}>
      <StyledOthersTable
        inputUsed
        detailContent={detailContent}
        onDetailChange={setDetailContent}
        formErrors={formErrors}
      />
    </div>
  );
};

const StyledActivityCreateStepFive = styled(ActivityCreateStepFive)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export default StyledActivityCreateStepFive;
