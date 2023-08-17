import styled from "styled-components"
import StyledTextInput from "../inputs/StyledTextInput"
import StyledTextArea from "../inputs/StyledTextArea"
import { useEffect, useState } from "react"
import { transferTimestamp } from "utils/date-fns"
import StyledDateInput from "../inputs/StyledDateInput"
import StyledLocationInput from "components/inputs/StyledLocationInput"
import { displayLocation } from "utils/location"
import clsx from "clsx"

const AccommodationTable = ({className, inputUsed, accommodationId, accommodationList, onAccommodationListChange}) => {
  const [accommodationDetail, setAccommodationDetail] = useState(accommodationList[accommodationId])
  
  useEffect(()=>{
    accommodationList.splice(accommodationId,1,accommodationDetail)
    onAccommodationListChange(accommodationList)
  },[accommodationDetail])

  return(
    <div className={className}>
      <table>
        <tbody>
          {accommodationId === 0 ?
           <tr><td className="c-table-key" colSpan={2}>住宿資訊</td></tr> 
           :<tr className="c-table-divide"></tr>
          }
          <tr>
            <td className={clsx("c-table-key",{inputUsed: inputUsed})}>住宿日期</td>
            <td className="o-activity-table__content">
              {inputUsed?
                <StyledDateInput
                  inputId="date" 
                  formContent={accommodationDetail} 
                  onFormChange={setAccommodationDetail}
                />
                :transferTimestamp(accommodationDetail?.date,"yyyy年MM月dd日")
              }
            </td>
          </tr>
          <tr>
              <td className={clsx("c-table-key",{inputUsed: inputUsed})}>住宿名稱</td>
              <td className="o-activity-table__content">
                {inputUsed?
                  <StyledTextInput
                    placeholder="民宿 / 飯店 / 山屋 / 營地"
                    inputId="name" 
                    formContent={accommodationDetail} 
                    onFormChange={setAccommodationDetail}
                  />
                  :accommodationDetail?.name
                }
              </td>
          </tr>
          <tr>
            <td className={clsx("c-table-key",{inputUsed: inputUsed})}>住宿地址</td>
            <td className="o-activity-table__content">
              {inputUsed?
                <StyledLocationInput
                  detailed
                  inputId="address"
                  formContent={accommodationDetail} 
                  onFormChange={setAccommodationDetail}
                />
                :displayLocation(accommodationDetail?.address)
              }
            </td>
          </tr>
          <tr>
              <td className={clsx("c-table-key",{inputUsed: inputUsed})}>房價資訊</td>
              <td className="o-activity-table__content">
                {inputUsed?
                  <StyledTextArea
                    placeholder="房型價位"
                    inputId="roomDetail" 
                    formContent={accommodationDetail} 
                    onFormChange={setAccommodationDetail}
                  />
                  :accommodationDetail?.roomDetail
                }
              </td>
          </tr>
          <tr>
              <td className={clsx("c-table-key",{inputUsed: inputUsed})}>住宿備註</td>
              <td className="o-activity-table__content">
                {inputUsed?
                  <StyledTextArea
                    placeholder="其他注意事項"
                    inputId="notes" 
                    formContent={accommodationDetail} 
                    onFormChange={setAccommodationDetail}
                  />
                  :accommodationDetail?.notes
                }
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StyledAccommodationTable = styled(AccommodationTable)`
  position: relative;
  width:100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .o-activity-table__content{
    background-color: white;
    white-space: pre-wrap;
  }

  .o-activity-table__divide{
    height: .5rem;
    padding: 0;
  }
`

export default StyledAccommodationTable