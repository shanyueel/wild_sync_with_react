import styled from 'styled-components';

import StyledTextArea from '../inputs/StyledTextArea';

const OthersTable = ({
  className,
  inputUsed,
  detailContent,
  onDetailChange,
  formErrors,
}) => {
  return (
    <>
      <table className={className}>
        <tbody>
          <tr>
            <td className="o-activity-table__key">行程細節</td>
          </tr>
          <tr>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledTextArea
                  placeholder="請輸入行程細節"
                  inputId="schedule"
                  wordLimit={500}
                  formContent={detailContent}
                  onFormChange={onDetailChange}
                  warning={formErrors?.schedule}
                />
              ) : (
                detailContent?.schedule
              )}
            </td>
          </tr>
          <tr>
            <td className="o-activity-table__key">備註</td>
          </tr>
          <tr>
            <td className="o-activity-table__content">
              {inputUsed ? (
                <StyledTextArea
                  placeholder="請輸入備註(非必填)"
                  inputId="notes"
                  wordLimit={250}
                  formContent={detailContent}
                  onFormChange={onDetailChange}
                />
              ) : (
                detailContent?.notes
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const StyledOthersTable = styled(OthersTable)`
  width: 100%;

  td {
    width: 100%;
    vertical-align: middle;
    padding: 0.75rem 0.75rem;
    border: 1.5px solid ${({ theme }) => theme.color.default};
  }

  .o-activity-table__key {
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: ${({ theme }) => theme.color.default};
    background-color: ${({ theme }) => theme.backgroundColor.default};
  }

  .o-activity-table__content {
    background-color: white;
    white-space: pre-wrap;
  }

  .o-activity-table__image {
    width: 100%;
  }
`;

export default StyledOthersTable;
