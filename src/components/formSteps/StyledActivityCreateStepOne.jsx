import { useEffect } from "react";
import styled from "styled-components";
import clsx from "clsx";

import StyledImageInput from "components/inputs/StyledImageInput";
import StyledPeriodInput from "components/inputs/StyledDateTimePeriodInput";
import StyledRadioInput from "components/inputs/StyledRadioInput";
import StyledTextInput from "components/inputs/StyledTextInput";
import StyledLocationInput from "components/inputs/StyledLocationInput";

const ActivityCreateStepOne = ({ className, formContent, onFormChange, formErrors, setFormErrors}) => {
  const defaultImageURL = require('data/defaultImageURL.json')
  const activityTypeOptions = require('data/activityTypeOptions.json')
  
  useEffect(()=>{
    const updatedErrors = {...formErrors}
    if(formContent?.coverURL) updatedErrors.coverURL = ""
    if(formContent?.name) updatedErrors.name = ""
    if(formContent?.type) updatedErrors.type = ""
    if(formContent?.location) updatedErrors.location = ""
    if(formContent?.time?.start && formContent?.time?.end) updatedErrors.time = ""
    setFormErrors(updatedErrors)
  },[formContent, formErrors, setFormErrors])

  return(
    <div className={clsx(className,"scrollbar") }>
      <StyledImageInput
        title="活動封面照片"
        inputId="coverURL"
        defaultImgURL={defaultImageURL.activityCover} 
        formContent={formContent} 
        onFormChange={onFormChange}
        warning={formErrors?.coverURL}
      />
      <StyledTextInput 
        title="活動名稱" 
        inputId="name" 
        placeholder="請輸入活動名稱 (字數限制: 16字)" 
        wordLimit={16}
        formContent={formContent} 
        onFormChange={onFormChange} 
        value={ formContent.name || "" }
        warning={formErrors?.name}
      />
      <StyledRadioInput 
        title="活動類型" 
        inputId="type"
        radioOptions={activityTypeOptions}
        formContent={formContent} 
        onFormChange={onFormChange}
        warning={formErrors?.type}
      />
      <StyledLocationInput
        title="活動地點"
        inputId="location"
        formContent={formContent} 
        onFormChange={onFormChange}
        warning={formErrors?.location}
      />
      <StyledPeriodInput 
        title="活動期間" 
        inputId="time" 
        formContent={formContent} 
        onFormChange={onFormChange}
        warning={formErrors?.time}
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