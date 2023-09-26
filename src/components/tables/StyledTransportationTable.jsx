import styled from "styled-components";
import StyledTextArea from "../inputs/StyledTextArea";
import clsx from "clsx";

const TransportationTable = ({className, inputUsed, transportationContent, onTransportationContentChange, formErrors}) => {
  return(
    <div className={className}>

      <table >
        <tbody>
          <tr>
              <td className={clsx("c-table-key",{inputUsed: inputUsed})} colSpan={2}>交通方式</td>
          </tr>
          <tr>
            <td className={clsx("c-table-key",{inputUsed: inputUsed})}>去程交通</td>
            <td className="c-table-content">
              {inputUsed?
                <StyledTextArea
                  placeholder="請輸入去程交通方式"
                  inputId="outbound"
                  wordLimit={150}
                  formContent={transportationContent}
                  onFormChange={onTransportationContentChange}
                  warning={formErrors.outbound}
                />
                :transportationContent?.outbound
              }
            </td>
          </tr>
          <tr>
            <td className={clsx("c-table-key",{inputUsed: inputUsed})}>回程交通</td>
            <td className="c-table-content">
              {inputUsed?
                <StyledTextArea
                  placeholder="請輸入回程交通方式"
                  inputId="inbound"
                  wordLimit={150}
                  formContent={transportationContent}
                  onFormChange={onTransportationContentChange}
                  warning={formErrors.inbound}
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