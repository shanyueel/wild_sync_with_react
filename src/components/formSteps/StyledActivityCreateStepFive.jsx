import styled from "styled-components";
import clsx from "clsx";

import StyledOthersTable from "components/StyledOthersTable";
import { useEffect, useState } from "react";

const ActivityCreateStepFive = ({ className, formContent, onFormChange}) => {
  const [detailContent, setDetailContent] = useState(formContent?.detail || {})
  
  useEffect(()=>{
    const updateForm = () => {
      const newForm = {
        ...formContent,
        detail: detailContent
      }
      onFormChange(newForm)
    }
    updateForm()
  },[detailContent])

  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledOthersTable 
        inputUsed
        detailContent={detailContent}
        onDetailChange={setDetailContent}
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