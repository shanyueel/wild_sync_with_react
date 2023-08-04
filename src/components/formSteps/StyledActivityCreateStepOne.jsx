import styled from "styled-components";
import clsx from "clsx";

import StyledImageInput from "components/inputs/StyledImageInput";
import StyledPeriodInput from "components/inputs/StyledPeriodInput";
import StyledRadioInput from "components/inputs/StyledRadioInput";
import StyledTextInput from "components/inputs/StyledTextInput";

const typeOptions = [
  { 
    name: "type",
    label: "登山",
    id: "hiking"
  },
  { 
    name: "type",
    label: "露營",
    id: "camping"
  },
  { 
    name: "type",
    label: "單車",
    id: "cycling"
  },
  { 
    name: "type",
    label: "潛水",
    id: "diving"
  },
  { 
    name: "type",
    label: "其他",
    id: "others"
  }
]

const activityId = 1

const ActivityCreateStepOne = ({ className, formContent, onFormChange}) => {
  return(
    <div className={clsx(className,"scrollbar") }>
      <StyledImageInput
        title="活動封面照片"
        inputId="coverURL"
        uploadFolder="activity-covers"
        uploadFilename={`${activityId}-cover`}
        defaultImgURL="" 
        formContent={formContent} 
        onFormChange={onFormChange}
      />
      <StyledTextInput 
        title="活動名稱" 
        placeholder="請輸入活動名稱" 
        inputId="name" 
        formContent={formContent} 
        onFormChange={onFormChange} 
        value={ formContent.name || "" }
      />
      <StyledRadioInput 
        title="活動類型" 
        formContent={formContent} 
        onFormChange={onFormChange} 
        radioOptions={typeOptions}
      />
      <StyledTextInput 
        title="活動地點" 
        placeholder="請輸入活動地點" 
        inputId="location" 
        formContent={formContent} 
        onFormChange={onFormChange}
      />
      <StyledPeriodInput 
        title="活動期間" 
        inputName="time" 
        formContent={formContent} 
        onFormChange={onFormChange}
      />
      
    </div>
  )
}

const StyledActivityCreateStepOne = styled(ActivityCreateStepOne)`
      display: flex;
      flex-direction: column;
      gap: .75rem;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
`

export default StyledActivityCreateStepOne