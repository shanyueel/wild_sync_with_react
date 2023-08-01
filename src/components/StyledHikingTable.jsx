import styled from "styled-components"
import StyledTextInput from "./inputs/StyledTextInput"
import StyledRadioInput from "./inputs/StyledRadioInput"
import StyledRangeInput from "./inputs/StyledRangeInput"
import StyledTextArea from "./inputs/StyledTextArea"
import StyledImageInput from "./inputs/StyledImageInput"

const trackTypeOptions = [
  { 
    name: "trackType",
    label: "環狀路線",
    id: "round"
  },
  { 
    name: "trackType",
    label: "原路折返",
    id: "backtrack"
  },
  { 
    name: "trackType",
    label: "甲進乙出",
    id: "one-way"
  },
]

const applicationNeededOptions = [
  { 
    name: "applicationNeeded",
    label: "需要",
    id: "needed"
  },
  { 
    name: "applicationNeeded",
    label: "不需要",
    id: "unNeeded"
  }
]

const activityId = 1

const HikingTable = ({className, inputUsed, detailContent, onDetailChange}) => {

  return(
    <>
        <table className={className}>
          <tbody>
            <tr>
              <td className="c-table-key">出發地點</td>
              <td className="c-table-content">
                {inputUsed?
                 <StyledTextInput
                  placeholder="出發地點" 
                  inputId="departurePoint" 
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                 :detailContent?.departurePoint
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key ">步道類型</td>
              <td className="c-table-content">
                {inputUsed &&
                 <StyledRadioInput
                  radioOptions={trackTypeOptions}
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                }
                {(!inputUsed && detailContent?.trackType === "round") && "環狀路線"}
                {(!inputUsed && detailContent?.trackType === "backtrack") && "原路折返"}
                {(!inputUsed && detailContent?.trackType === "one-way") && "雙向進出"}
              </td>
            </tr>
            <tr>
              <td className="c-table-key ">路徑長度</td>
              <td className="c-table-content">
                {inputUsed?
                 <StyledTextInput
                  numberUsed
                  placeholder="路徑長度" 
                  inputId="trackLength"
                  unit="公里" 
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                 :`${detailContent?.trackLength} 公里`
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key ">海拔高度</td>
              <td className="c-table-content">
                {inputUsed?
                 <StyledRangeInput
                  minPlaceholder="最低海拔" 
                  maxPlaceholder="最高海拔" 
                  unit="m" 
                  inputName="altitude"
                  minInputId="minAltitude" 
                  maxInputId="maxAltitude"
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                 :`${detailContent?.altitude[0]} - ${detailContent?.altitude[1]} m`
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key ">路面狀況</td>
              <td className="c-table-content">
                {inputUsed?
                 <StyledTextInput
                  placeholder="路徑狀況" 
                  inputId="trackCondition"
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                 :detailContent?.trackCondition
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key ">所屬園區</td>
              <td className="c-table-content">
                {inputUsed?
                 <StyledTextInput
                  placeholder="所屬園區( 若沒有，可填無 )"
                  inputId="belongingPark"
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                 :detailContent?.belongingPark
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key ">入園申請</td>
              <td className="c-table-content">
                {inputUsed &&
                 <StyledRadioInput
                  radioOptions={applicationNeededOptions}
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                 />
                }
                {(!inputUsed && detailContent?.applicationNeeded === "needed") && "需要"}
                {(!inputUsed && detailContent?.applicationNeeded === "unNeeded") && "不需要"}
              </td>
            </tr>
            <tr>
              <td className="c-table-key " colSpan={2}>路線資訊</td>
            </tr>
            <tr>
              <td className="c-table-content" colSpan={2}>
                {inputUsed?
                  <StyledTextArea
                    placeholder="請輸入路線資訊" 
                    inputId="trackIntroduction" 
                    formContent={detailContent}
                    onFormChange={onDetailChange}
                  />
                  :detailContent?.trackIntroduction
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key " colSpan={2}>路徑地圖</td>
            </tr>
            <tr>
              <td className="c-table-content" colSpan={2}>
                {inputUsed?
                  <StyledImageInput
                    inputId="routeURL"
                    uploadFolder="activity-route"
                    uploadFilename={`${activityId}-route`}
                    defaultImgURL="" 
                    formContent={detailContent} 
                    onFormChange={onDetailChange}
                  />
                  :<img className="o-hiking-table__image" src={detailContent?.trackImage} alt="hiking map"/>
                }
                
              </td>
            </tr>        
          </tbody>
        </table>
    </>
  )
}

const StyledHikingTable = styled(HikingTable)`
  width: 100%;
  
  .o-hiking-table__image{
    width: 100%;
  }


`

export default StyledHikingTable