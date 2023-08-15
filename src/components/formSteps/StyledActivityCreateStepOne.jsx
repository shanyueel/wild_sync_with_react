import styled from "styled-components";
import clsx from "clsx";

import StyledImageInput from "components/inputs/StyledImageInput";
import StyledPeriodInput from "components/inputs/StyledPeriodInput";
import StyledRadioInput from "components/inputs/StyledRadioInput";
import StyledTextInput from "components/inputs/StyledTextInput";
import StyledLocationInput from "components/inputs/StyledLocationInput";


const ActivityCreateStepOne = ({ className, formContent, onFormChange}) => {
  const defaultImageURL = require('data/defaultImageURL.json')
  const typeOptions = require('data/activityTypeOptions.json')

  return(
    <div className={clsx(className,"scrollbar") }>
      <StyledImageInput
        title="活動封面照片"
        inputId="coverURL"
        defaultImgURL={defaultImageURL.activityCover} 
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
      <StyledLocationInput
        title="活動地點"
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