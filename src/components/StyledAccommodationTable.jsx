import styled from "styled-components"
import StyledDateTimeInput from "./inputs/StyledDateTimeInput"
import StyledTextInput from "./inputs/StyledTextInput"
import StyledTextArea from "./inputs/StyledTextArea"
import { useEffect, useState } from "react"

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
            <td className="c-table-key">住宿日期</td>
            <td className="o-activity-table__content">
              {inputUsed?
                <StyledDateTimeInput 
                  inputId="date" 
                  formContent={accommodationDetail} 
                  onFormChange={setAccommodationDetail}
                />
                :accommodationDetail?.date
              }
            </td>
          </tr>
          <tr>
              <td className="c-table-key">住宿名稱</td>
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
            <td className="c-table-key">住宿地點</td>
            <td className="o-activity-table__content">
              {inputUsed?
                <StyledTextInput
                  placeholder="住宿詳細地址"
                  inputId="address" 
                  formContent={accommodationDetail} 
                  onFormChange={setAccommodationDetail}
                />
                :accommodationDetail?.address
              }
            </td>
          </tr>
          <tr>
              <td className="c-table-key">房價資訊</td>
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
              <td className="c-table-key">住宿備註</td>
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
  width:100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .c-table-key{
    text-align: center;
    width: 9rem;
    font-weight: 700;
    color: ${({theme})=> theme.color.default};
    background-color: ${({theme})=> theme.backgroundColor.default};
  }

  .o-activity-table__content{
    background-color: white;
    white-space: pre-wrap;
  }

  .o-activity-table__divide{
    height: .5rem;
    padding: 0;
  }

  @media screen and (min-width: 768px) {
    .c-table-key{
      width: 12rem;
    }
  }
`

export default StyledAccommodationTable