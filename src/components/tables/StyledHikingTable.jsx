import styled from "styled-components"
import clsx from "clsx"

import { displayLocation } from "utils/location"

import StyledTextInput from "../inputs/StyledTextInput"
import StyledRadioInput from "../inputs/StyledRadioInput"
import StyledRangeInput from "../inputs/StyledRangeInput"
import StyledTextArea from "../inputs/StyledTextArea"
import StyledImageInput from "../inputs/StyledImageInput"
import StyledLocationInput from "../inputs/StyledLocationInput"

const HikingTable = ({className, inputUsed, detailContent, onDetailChange}) => {
  const defaultImageURL = require('data/defaultImageURL.json')
  const hikingTrackTypeOptions = require('data/hikingTrackTypeOptions.json')
  const hikingApplicationNeededOptions = require('data/hikingApplicationNeededOptions.json')

  return(
    <table className={className}>
      <tbody>
        <tr>
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>出發地點</td>
          <td className="c-table-content">
            {inputUsed?
              <StyledLocationInput
              detailed
              inputId="departurePoint" 
              formContent={detailContent} 
              onFormChange={onDetailChange}
              />
              :displayLocation(detailContent?.departurePoint)
            }
          </td>
        </tr>
        <tr>
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>步道類型</td>
          <td className="c-table-content">
            {inputUsed &&
              <StyledRadioInput
              inputId="trackType"
              radioOptions={hikingTrackTypeOptions}
              formContent={detailContent} 
              onFormChange={onDetailChange}
              />
            }
            {(!inputUsed && detailContent?.trackType === "round") && "環狀路線"}
            {(!inputUsed && detailContent?.trackType === "backtrack") && "原路折返"}
            {(!inputUsed && detailContent?.trackType === "one-way") && "雙向進出"}
          </td>
        </tr>  
        {
          detailContent?.trackType === "one-way" &&
          <>
            <tr>
              <td className={clsx("c-table-key",{inputUsed: inputUsed})}>登出地點</td>
              <td className="c-table-content">
                {inputUsed?
                <StyledLocationInput
                  detailed
                  inputId="exitPoint" 
                  formContent={detailContent} 
                  onFormChange={onDetailChange}
                />
                :detailContent?.exitPoint
                }
              </td>
            </tr>
          </>
        }
        <tr>
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>路徑長度</td>
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
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>海拔高度</td>
          <td className="c-table-content">
            {inputUsed?
              <StyledRangeInput
                inputId="altitude"
                minPlaceholder="最低海拔" 
                maxPlaceholder="最高海拔" 
                unit="m" 
                formContent={detailContent} 
                onFormChange={onDetailChange}
              />
              :`${detailContent?.altitude?.min} - ${detailContent?.altitude?.max} m`
            }
          </td>
        </tr>
        <tr>
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>路面種類</td>
          <td className="c-table-content">
            {inputUsed?
              <StyledTextInput
              placeholder="路徑主類 (石階 / 泥土 / 拉繩)" 
              inputId="trackCondition"
              formContent={detailContent} 
              onFormChange={onDetailChange}
              />
              :detailContent?.trackCondition
            }
          </td>
        </tr>
        <tr>
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>所屬園區</td>
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
          <td className={clsx("c-table-key",{inputUsed: inputUsed})}>入園申請</td>
          <td className="c-table-content">
            {inputUsed &&
              <StyledRadioInput
              inputId="applicationNeeded"
              radioOptions={hikingApplicationNeededOptions}
              formContent={detailContent} 
              onFormChange={onDetailChange}
              />
            }
            {(!inputUsed && detailContent?.applicationNeeded === "needed") && "需要"}
            {(!inputUsed && detailContent?.applicationNeeded === "unNeeded") && "不需要"}
          </td>
        </tr>
        <tr>
          <td className={clsx("c-table-key",{inputUsed: inputUsed})} colSpan={2}>路線資訊</td>
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
          <td className={clsx("c-table-key",{inputUsed: inputUsed})} colSpan={2}>路徑地圖</td>
        </tr>
        <tr>
          <td className="c-table-content" colSpan={2}>
            {inputUsed?
              <StyledImageInput
                activityMapUsed
                inputId="mapURL"
                defaultImgURL={defaultImageURL.activityMap} 
                formContent={detailContent} 
                onFormChange={onDetailChange}
              />
              :<img className="o-hiking-table__image" src={detailContent?.mapURL || defaultImageURL.activityMap} alt="hiking map"/>
            }
            
          </td>
        </tr>        
      </tbody>
    </table>
  )
}

const StyledHikingTable = styled(HikingTable)`
  width: 100%;
  
  .o-hiking-table__image{
    width: 100%;
  }

`

export default StyledHikingTable