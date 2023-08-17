import styled from "styled-components";
import clsx from "clsx";

import StyledAccommodationTable from "components/tables/StyledAccommodationTable";
import StyledTransportationTable from "components/tables/StyledTransportationTable";

import {ReactComponent as PlusIcon} from "assets/icons/PlusIcon.svg";
import {ReactComponent as MinusIcon} from "assets/icons/MinusIcon.svg";
import { useEffect, useState } from "react";

const ActivityCreateStepFour = ({ className, formContent, onFormChange}) => {
  const [transportationContent, setTransportationContent] = useState(formContent?.transportation || {})
  const [accommodationList, setAccommodationList] = useState(formContent?.accommodation || [])
  const [accommodationCount, setAccommodationCount] = useState(formContent?.accommodation?.length - 1)

  useEffect(()=>{
    const updateTransportationForm = () => {
      const newForm = {
        ...formContent,
        transportation: transportationContent
      }
      onFormChange(newForm)
    }
    updateTransportationForm()
  },[transportationContent, formContent, onFormChange])

  useEffect(()=>{
    const updateAccommodationForm = () => {
      const newForm = {
        ...formContent,
        accommodation: accommodationList
      }
      onFormChange(newForm)
    }
    updateAccommodationForm()
  },[accommodationList, formContent, onFormChange])
  
  const handleAccommodationAdd = () => {
    const newId = accommodationCount + 1
    const newArray = [
      ...accommodationList,
      {
        id: newId,
        date: null,
        name: "",
        address: "",
        roomDetail: "",
        notes:""
      }
    ]

    setAccommodationCount(newId)
    setAccommodationList(newArray)
  }

  const handleAccommodationRemove = () => {
    const resetId = accommodationCount - 1
    accommodationList?.pop()
    setAccommodationCount(resetId)
    setAccommodationList(accommodationList)
  }

  return(
    <div className={clsx(className,"scrollbar") }>
      
      <StyledTransportationTable
        inputUsed={formContent}
        transportationContent={transportationContent} 
        onTransportationContentChange={setTransportationContent}
      />
      
      <div className="l-activity-create__accommodation">

        {accommodationList?.map((accommodationContent, index)=>{
          return(
            <StyledAccommodationTable
              key={index}
              inputUsed
              accommodationId={accommodationContent?.id}
              accommodationList={accommodationList}
              onAccommodationListChange={setAccommodationList}
            />
          )
        })}

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