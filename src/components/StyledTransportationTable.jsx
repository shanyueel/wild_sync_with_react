import styled from "styled-components";
import StyledTextArea from "./inputs/StyledTextArea";

const TransportationTable = ({className, inputUsed, transportationContent, onTransportationContentChange}) => {
  return(
    <div className={className}>

      <table >
        <tbody>
          <tr>
              <td className="c-table-key" colSpan={2}>交通方式</td>
          </tr>
          <tr>
            <td className="c-table-key">去程交通</td>
            <td className="c-table-content">
              {inputUsed?
                <StyledTextArea
                  placeholder="請輸入去程交通方式"
                  inputId="outbound"
                  formContent={transportationContent}
                  onFormChange={onTransportationContentChange}
                />
                :transportationContent?.outbound
              }
            </td>
          </tr>
          <tr>
            <td className="c-table-key">回程交通</td>
            <td className="c-table-content">
              {inputUsed?
                <StyledTextArea
                  placeholder="請輸入回程交通方式"
                  inputId="inbound"
                  formContent={transportationContent}
                  onFormChange={onTransportationContentChange}
                />
                :transportationContent?.inbound
              }
              
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

const StyledTransportationTable = styled(TransportationTable)`
  width: 100%;
  height: 100%;
`

export default StyledTransportationTable