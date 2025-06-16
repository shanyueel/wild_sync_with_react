import { useEffect } from "react";
import styled from "styled-components";
import clsx from "clsx";

import StyledRadioInput from "components/inputs/StyledRadioInput";
import StyledRangeInput from "components/inputs/StyledRangeInput";
import StyledDateTimeInput from "components/inputs/StyledDateTimeInput";
import StyledTextArea from "components/inputs/StyledTextArea";
import StyledNumberInput from "components/inputs/StyledNumberInput";

import activityDifficultyOptions from 'data/activityDifficultyOptions.json'

const ActivityCreateStepTwo = ({ className, formContent, onFormChange, formErrors, setFormErrors}) => {
  
  useEffect(()=>{
    const updatedErrors = {...formErrors}
    if(formContent?.difficulty) updatedErrors.difficulty = ""
    if(formContent?.activityTimeLength) updatedErrors.activityTimeLength = ""
    if(formContent?.cost) updatedErrors.cost = ""
    if(formContent?.attendanceLimit) updatedErrors.attendanceLimit = ""
    if(formContent?.deadline) updatedErrors.deadline = ""
    if(formContent?.introduction) updatedErrors.introduction = ""

    if(JSON.stringify(updatedErrors) !== JSON.stringify(formErrors)) setFormErrors(updatedErrors)

  },[formContent, formErrors, setFormErrors])

  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledRadioInput 
        title="難易程度" 
        inputId="difficulty"
        formContent={formContent}
        onFormChange={onFormChange} 
        radioOptions={activityDifficultyOptions}
        warning={formErrors?.difficulty}
      />
      <StyledNumberInput
        title="戶外活動時長"
        inputId="activityTimeLength"
        placeholder="請輸入實際進行活動的時長(扣除通勤、用餐、住宿等)" 
        unit="小時"
        minLimit={0}
        step={0.5}
        formContent={formContent} 
        onFormChange={onFormChange}
        warning={formErrors?.activityTimeLength}
      />
      <StyledRangeInput 
        title="預估費用"
        inputId="cost"
        minPlaceholder="最低費用" 
        maxPlaceholder="最高費用" 
        unit="$" 
        minLimit={0}
        formContent={formContent}
        onFormChange={onFormChange}
        warning={formErrors?.cost}
      />
      <StyledNumberInput
        title="人數限制" 
        inputId="attendanceLimit" 
        placeholder="報名人數上限 (不含主辦人)" 
        unit="人"
        minLimit={0}
        formContent={formContent} 
        onFormChange={onFormChange}
        warning={formErrors?.attendanceLimit}
      />
      <StyledDateTimeInput
        title="申請截止時間" 
        inputId="deadline"
        formContent={formContent}
        onFormChange={onFormChange} 
        warning={formErrors?.deadline}
      />
      <StyledTextArea
        title="活動簡介" 
        placeholder="請簡單介紹活動內容 (字數限制: 100字)" 
        inputId="introduction"
        wordLimit={100}
        formContent={formContent} 
        onFormChange={onFormChange} 
        warning={formErrors?.introduction}
      />

    </div>
  )
}

const StyledActivityCreateStepTwo = styled(ActivityCreateStepTwo)`
      display: flex;
      flex-direction: column;
      gap: .75rem;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
`

export default StyledActivityCreateStepTwo