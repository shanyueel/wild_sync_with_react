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

const ActivityCreateStepOne = ({ className, formContent, onFormChange}) => {
  return(
    <div className={clsx(className,"scrollbar") }>
      <StyledImageInput
        title="活動封面照片"
        inputId="coverURL"
        defaultImgURL="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/activity-covers%2Fdefault-cover.jpg?alt=media&token=2eedc2a0-8f83-4168-be67-bdfae41b04b5" 
        formContent={formContent} 
        onFormChange={onFormChange}
      />
      <StyledTextInput 
        title="活動名稱" 
        inputId="name" 
        placeholder="請輸入活動名稱 (字數限制: 16字)" 
        wordLimit={16}
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