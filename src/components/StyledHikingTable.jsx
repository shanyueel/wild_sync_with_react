import styled from "styled-components"
import StyledTextInput from "./inputs/StyledTextInput"
import StyledRadioInput from "./inputs/StyledRadioInput"
import StyledRangeInput from "./inputs/StyledRangeInput"
import StyledTextArea from "./inputs/StyledTextArea"
import StyledImageInput from "./inputs/StyledImageInput"

const HikingTable = ({className, inputUsed, formContent, onFormChange}) => {
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

  return(
    <>
        <table className={className}>
          <tbody>
            <tr>
              <td className="c-table-key o-activity-key">出發地點</td>
              <td className="c-table-content o-activity-content">
                {inputUsed?
                 <StyledTextInput
                  placeholder="出發地點" 
                  inputId="departurePoint" 
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                 :formContent?.departurePoint
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">步道類型</td>
              <td className="c-table-content o-activity-content">
                {inputUsed &&
                 <StyledRadioInput
                  radioOptions={trackTypeOptions}
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                }
                {(!inputUsed && formContent?.trackType === "round") && "環狀路線"}
                {(!inputUsed && formContent?.trackType === "backtrack") && "原路折返"}
                {(!inputUsed && formContent?.trackType === "one-way") && "雙向進出"}
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">路徑長度</td>
              <td className="c-table-content o-activity-content">
                {inputUsed?
                 <StyledTextInput
                  numberUsed
                  placeholder="路徑長度" 
                  inputId="trackLength"
                  unit="公里" 
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                 :`${formContent?.trackLength} 公里`
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">海拔高度</td>
              <td className="c-table-content o-activity-content">
                {inputUsed?
                 <StyledRangeInput
                  minPlaceholder="最低海拔" 
                  maxPlaceholder="最高海拔" 
                  unit="m" 
                  inputName="altitude"
                  minInputId="minAltitude" 
                  maxInputId="maxAltitude"
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                 :`${formContent?.altitude[0]} - ${formContent?.altitude[1]} m`
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">路面狀況</td>
              <td className="c-table-content o-activity-content">
                {inputUsed?
                 <StyledTextInput
                  placeholder="路徑狀況" 
                  inputId="trackCondition"
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                 :formContent?.trackCondition
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">所屬園區</td>
              <td className="c-table-content o-activity-content">
                {inputUsed?
                 <StyledTextInput
                  placeholder="所屬園區( 若沒有，可填無 )"
                  inputId="belongingPark"
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                 :formContent?.belongingPark
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">入園申請</td>
              <td className="c-table-content o-activity-content">
                {inputUsed &&
                 <StyledRadioInput
                  radioOptions={applicationNeededOptions}
                  formContent={formContent} 
                  onFormChange={onFormChange}
                 />
                }
                {(!inputUsed && formContent?.applicationNeeded === "needed") && "需要"}
                {(!inputUsed && formContent?.applicationNeeded === "unNeeded") && "不需要"}
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key" colSpan={2}>路線資訊</td>
            </tr>
            <tr>
              <td className="c-table-content o-activity-content" colSpan={2}>
                {inputUsed?
                  <StyledTextArea
                    placeholder="請輸入路線資訊" 
                    inputId="trackIntroduction" 
                    formContent={formContent}
                    onFormChange={onFormChange}
                  />
                  :formContent?.trackIntroduction
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key" colSpan={2}>路徑地圖</td>
            </tr>
            <tr>
              <td className="c-table-content o-activity-content" colSpan={2}>
                {inputUsed?
                  <StyledImageInput/>
                  :<img className="o-activity-table__image" src={formContent.trackImage} alt="hiking map"/>
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
  
  .o-activity-table__image{
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .o-activity-key{
      width: 12rem;
      white-space: nowrap;
    }
  }
`

export default StyledHikingTable