import styled from 'styled-components';
import StyledTextArea from '../inputs/StyledTextArea';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const TransportationTable = ({
  className,
  inputUsed,
  transportationContent,
  onTransportationContentChange,
  formErrors,
}) => {
  const { t } = useTranslation('tables');
  return (
    <div className={className}>
      <table>
        <tbody>
          <tr>
            <td
              className={clsx('c-table-key', { inputUsed: inputUsed })}
              colSpan={2}
            >
              {t('transportation')}
            </td>
          </tr>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('outbound')}
            </td>
            <td className="c-table-content">
              {inputUsed ? (
                <StyledTextArea
                  placeholder={t('enterOutbound')}
                  inputId="outbound"
                  wordLimit={150}
                  formContent={transportationContent}
                  onFormChange={onTransportationContentChange}
                  warning={formErrors.outbound}
                />
              ) : (
                transportationContent?.outbound
              )}
            </td>
          </tr>
          <tr>
            <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
              {t('inbound')}
            </td>
            <td className="c-table-content">
              {inputUsed ? (
                <StyledTextArea
                  placeholder={t('enterInbound')}
                  inputId="inbound"
                  wordLimit={150}
                  formContent={transportationContent}
                  onFormChange={onTransportationContentChange}
                  warning={formErrors.inbound}
                />
              ) : (
                transportationContent?.inbound
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const StyledTransportationTable = styled(TransportationTable)`
  width: 100%;
  height: 100%;
`;

export default StyledTransportationTable;
