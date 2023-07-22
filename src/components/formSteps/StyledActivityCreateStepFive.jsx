import styled from "styled-components";
import clsx from "clsx";

import StyledResidenceAndTransportationTable from "components/StyledResidenceTable";
import StyledOthersTable from "components/StyledOthersTable";

const ActivityCreateStepFive = ({ className, formContent, onFormChange}) => {
  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledOthersTable 
        inputUsed
      />

    </div>
  )
}

const StyledActivityCreateStepFive = styled(ActivityCreateStepFive)`
      display: flex;
      flex-direction: column;
      gap: .75rem;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
`

export default StyledActivityCreateStepFive