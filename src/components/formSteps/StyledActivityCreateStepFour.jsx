import styled from "styled-components";
import clsx from "clsx";

import StyledResidenceAndTransportationTable from "components/StyledResidenceTable";
import StyledTransportationTable from "components/StyledTransportationTable";

const ActivityCreateStepFour = ({ className, formContent, onFormChange}) => {
  
  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledTransportationTable
        inputUsed={formContent}
        transportationContent={formContent} 
        onTransportationContentChange={onFormChange}
      />
      <StyledResidenceAndTransportationTable 
        inputUsed 
        residenceContent={formContent} 
        onResidenceChange={onFormChange}
      />
      

    </div>
  )
}

const StyledActivityCreateStepFour = styled(ActivityCreateStepFour)`
      display: flex;
      flex-direction: column;
      gap: .75rem;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
`

export default StyledActivityCreateStepFour