import styled from "styled-components"
import StyledTextArea from "./inputs/StyledTextArea"
import { useState } from "react"
import StyledDateTimeInput from "./inputs/StyledDateTimeInput"

const ResidenceAndTransportationTable = ({className, inputUsed, formContent, onFormChange}) => {
  const [residenceContent, setResidenceContent] = useState([])

  return(
    <div className={className}>
      <table >
        <tbody>
          <tr>
              <td className="o-activity-table__key" colSpan={2}>交通方式</td>
          </tr>
          <tr>
            <td className="o-activity-table__key">去程交通</td>
            <td className="o-activity-table__content">
              {inputUsed?
                <StyledTextArea
                  placeholder="請輸入去程交通方式"
                  inputId="outbound"
                  formContent={formContent}
                  onFormChange={onFormChange}
                />
                :formContent?.outbound
              }
            </td>
          </tr>
          <tr>
            <td className="o-activity-table__key">回程交通</td>
            <td className="o-activity-table__content">
              {inputUsed?
                <StyledTextArea
                  placeholder="請輸入回程交通方式"
                  inputId="inbound"
                  formContent={formContent}
                  onFormChange={onFormChange}
                />
                :formContent?.inbound
              }
              
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
              <td className="o-activity-table__key" colSpan={2}>住宿資訊</td>
          </tr>
          <tr>
              <td className="o-activity-table__key">住宿日期</td>
              <td className="o-activity-table__content">
                {inputUsed?
                  <StyledDateTimeInput 
                    inputId="date" 
                    formContent={residence} onFormChange
                  />
                  :formContent?.date
                }
              </td>
          </tr>
          <tr>
              <td className="o-activity-table__key">住宿名稱</td>
              <td className="o-activity-table__content">萌陽莊園</td>
          </tr>
          <tr>
            <td className="o-activity-table__key">住宿地點</td>
            <td className="o-activity-table__content">南投縣水里鄉安田路9號</td>
          </tr>
          <tr>
              <td className="o-activity-table__key">房價資訊</td>
              <td className="o-activity-table__content">
                -大通鋪: 1200元 / 人<br />
                -雙人房: 1400元 / 人
              </td>
          </tr>
          <tr>
              <td className="o-activity-table__key">住宿備註</td>
              <td className="o-activity-table__content">有提供車位 / 早餐</td>
          </tr>


          <tr>
            <td className="o-activity-table__divide" colSpan={2}></td>
          </tr>
          <tr>
              <td className="o-activity-table__key">住宿日期</td>
              <td className="o-activity-table__content">2023.07.02 星期日</td>
          </tr>
          <tr>
              <td className="o-activity-table__key">住宿名稱</td>
              <td className="o-activity-table__content">萌陽莊園</td>
          </tr>
          <tr>
            <td className="o-activity-table__key">住宿地點</td>
            <td className="o-activity-table__content">南投縣水里鄉安田路9號</td>
          </tr>
          <tr>
              <td className="o-activity-table__key">房價資訊</td>
              <td className="o-activity-table__content">
                -大通鋪: 1200元 / 人<br />
                -雙人房: 1400元 / 人
              </td>
          </tr>
          <tr>
              <td className="o-activity-table__key">提供車位</td>
              <td className="o-activity-table__content">有</td>
          </tr>
          <tr>
              <td className="o-activity-table__key">提供早餐</td>
              <td className="o-activity-table__content">無</td>
          </tr>      
        </tbody>
      </table>
    </div>
  )
}

const StyledResidenceAndTransportationTable = styled(ResidenceAndTransportationTable)`
  width:100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .o-activity-table__key{
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
    .o-activity-table__key{
      width: 12rem;
    }
  }
`

export default StyledResidenceAndTransportationTable