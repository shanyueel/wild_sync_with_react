import styled from "styled-components";
import clsx from "clsx";

import StyledHikingTable from "components/StyledHikingTable";
import { useEffect, useState } from "react";

const ActivityCreateStepThree = ({ className, formContent, onFormChange}) => {
  const [detailContent, setDetailContent] = useState(formContent?.detail || {})
  
  useEffect(()=>{
    const updateForm = () => {
      onFormChange({
        ...formContent,
        detail: detailContent
      })
    }

    updateForm()
    
  },[detailContent])
  
  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledHikingTable 
        inputUsed 
        detailContent={detailContent} 
        onDetailChange={setDetailContent}
      />

    </div>
  )
}

const StyledActivityCreateStepThree = styled(ActivityCreateStepThree)`
      display: flex;
      flex-direction: column;
      gap: .75rem;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
`

export default StyledActivityCreateStepThree