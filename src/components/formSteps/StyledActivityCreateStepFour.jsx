import styled from "styled-components";
import clsx from "clsx";
import { useEffect, useState } from "react";

import StyledAccommodationTable from "components/tables/StyledAccommodationTable";
import StyledTransportationTable from "components/tables/StyledTransportationTable";

import {ReactComponent as PlusIcon} from "assets/icons/PlusIcon.svg";
import {ReactComponent as MinusIcon} from "assets/icons/MinusIcon.svg";

const ActivityCreateStepFour = ({ className, formContent, onFormChange, formErrors, setFormErrors}) => {
  const [transportationContent, setTransportationContent] = useState(formContent?.transportation || {})
  const [accommodationList, setAccommodationList] = useState(formContent?.accommodation || [])

  const updateTransportationForm = () => {
    const newForm = {
      ...formContent,
      transportation: transportationContent
    }
    onFormChange(newForm)
  }

  const updateAccommodationForm = () => {
    const newForm = {
      ...formContent,
      accommodation: accommodationList
    }
    onFormChange(newForm)
  }

  const checkIsStepFourComplete = () => {
    const updatedFormErrors = {...formErrors}

    if(formContent?.transportation?.inbound) updatedFormErrors.inbound = ""
    if(formContent?.transportation?.outbound) updatedFormErrors.outbound = ""

    for(let i = 0; i < formContent?.accommodation?.length; i++){
      const accommodationDay = formContent?.accommodation?.[i]
      if(accommodationDay){
        if(accommodationDay?.date && updatedFormErrors?.accommodation?.[i]?.date) updatedFormErrors.accommodation[i].date= ""
        if(accommodationDay?.name && updatedFormErrors?.accommodation?.[i]?.name) updatedFormErrors.accommodation[i].name = ""
        if(accommodationDay?.address && updatedFormErrors?.accommodation?.[i]?.address) updatedFormErrors.accommodation[i].address = ""
        if(accommodationDay?.roomDetail && updatedFormErrors?.accommodation?.[i]?.roomDetail) updatedFormErrors.accommodation[i].roomDetail = ""
        if(accommodationDay.notes && updatedFormErrors.accommodation?.[i]?.notes) updatedFormErrors.accommodation[i].notes = ""
      }
    }

    setFormErrors(updatedFormErrors);
  }

  useEffect(()=>{
    updateTransportationForm()
  },[transportationContent])

  useEffect(()=>{
    updateAccommodationForm()
  },[accommodationList])

  useEffect(()=>{
    checkIsStepFourComplete()
  },[formContent?.transportation, formContent?.accommodation])
  
  const handleAccommodationAdd = () => {
    const newArray = [ ...accommodationList, {} ]
    setAccommodationList(newArray)
  }

  const handleAccommodationRemove = () => {
    const newArray = accommodationList?.slice(0,-1)
    setAccommodationList(newArray)
  }

  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledTransportationTable
        inputUsed={formContent}
        transportationContent={transportationContent} 
        onTransportationContentChange={setTransportationContent}
        formErrors={formErrors}
      />
      
      <div className="l-activity-create__accommodation">
        {accommodationList?.length > 0 &&       
          <table>
            <tbody>
              <tr><td className="c-table-key" colSpan={2}>住宿資訊</td></tr> 
            </tbody>
          </table>
        }
        {
          accommodationList?.length > 0 && 
          accommodationList?.map((accommodationDay,index)=>{
            return(
              <StyledAccommodationTable
                key={index}
                inputUsed
                accommodationDay={accommodationDay}
                accommodationIndex={index}
                accommodationList={accommodationList}
                onAccommodationListChange={setAccommodationList}
                formErrors={formErrors}
              />
            )
          })
        }

      </div>

      <div className="c-activity-create__accommodation-buttons">
        {
          accommodationList?.length > 0 && 
          <div className="c-activity-create__accommodation-minus-button" onClick={handleAccommodationRemove}><MinusIcon/>移除住宿</div>
        }
        <div className="c-activity-create__accommodation-add-button" onClick={handleAccommodationAdd}><PlusIcon/>新增住宿</div> 
      </div>
      
    </div>
  )
}

const StyledActivityCreateStepFour = styled(ActivityCreateStepFour)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;

  .c-activity-create__accommodation-buttons{
    display: flex;
    margin: 0 auto;
    gap: 1rem;
    width: fit-content;
    .c-activity-create__accommodation-add-button,
    .c-activity-create__accommodation-minus-button{
      display: flex;
      align-items: center;
      margin: 0 auto;
      font-weight: 700;
      gap: .25rem;
      background-color: white;
      border-radius: 1.25rem;
      padding: .5rem 1rem;
      cursor: pointer;

      svg{
        width: 1.5rem;
        height: 1.5rem;
        
      }
    }

    .c-activity-create__accommodation-add-button svg{
      fill: ${({theme})=> theme.color.default}
    }

    .c-activity-create__accommodation-minus-button svg{
      fill: ${({theme})=> theme.color.alert}
    }
  }
`

export default StyledActivityCreateStepFour