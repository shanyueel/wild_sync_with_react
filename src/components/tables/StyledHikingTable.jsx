import { useMemo } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { displayLocation } from 'utils/location';

import StyledTextInput from '../inputs/StyledTextInput';
import StyledRadioInput from '../inputs/StyledRadioInput';
import StyledRangeInput from '../inputs/StyledRangeInput';
import StyledTextArea from '../inputs/StyledTextArea';
import StyledImageInput from '../inputs/StyledImageInput';
import StyledLocationInput from '../inputs/StyledLocationInput';
import StyledNumberInput from 'components/inputs/StyledNumberInput';

import defaultImageURL from 'data/defaultImageURL.json';
import hikingTrackTypeOptions from 'data/hikingTrackTypeOptions.json';
import hikingApplicationNeededOptions from 'data/hikingApplicationNeededOptions.json';

const HikingTable = ({
  className,
  inputUsed,
  detailContent,
  onDetailChange,
  formErrors,
}) => {
  const { t, i18n } = useTranslation(['tables', 'common']);

  const translatedTrackTypes = useMemo(
    () =>
      hikingTrackTypeOptions.map((option) => ({
        ...option,
        name: t(`common:trailTypes.${option.id}`),
      })),
    [t]
  );

  const translatedRequirement = useMemo(
    () =>
      hikingApplicationNeededOptions.map((option) => ({
        ...option,
        name: t(`common:requirement.${option.id}`),
      })),
    [t]
  );

  return (
    <table className={className}>
      <tbody>
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('departurePoint')}
          </td>
          <td className="c-table-content">
            {inputUsed ? (
              <StyledLocationInput
                detailed
                inputId="departurePoint"
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.departurePoint}
              />
            ) : (
              displayLocation(detailContent?.departurePoint, t, i18n)
            )}
          </td>
        </tr>
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('trailType')}
          </td>
          <td className="c-table-content">
            {inputUsed && (
              <StyledRadioInput
                inputId="trackType"
                radioOptions={translatedTrackTypes}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.trackType}
              />
            )}
            {!inputUsed &&
              detailContent?.trackType === 'round' &&
              t('common:trailTypes.loop')}
            {!inputUsed &&
              detailContent?.trackType === 'backtrack' &&
              t('common:trailTypes.outAndBack')}
            {!inputUsed &&
              detailContent?.trackType === 'one-way' &&
              t('common:trailTypes.pointToPoint')}
          </td>
        </tr>
        {detailContent?.trackType === 'one-way' && (
          <>
            <tr>
              <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
                {t('exitPoint')}
              </td>
              <td className="c-table-content">
                {inputUsed ? (
                  <StyledLocationInput
                    detailed
                    inputId="exitPoint"
                    formContent={detailContent}
                    onFormChange={onDetailChange}
                    warning={formErrors?.exitPoint}
                  />
                ) : (
                  displayLocation(detailContent?.exitPoint, t, i18n)
                )}
              </td>
            </tr>
          </>
        )}
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('trailLength')}
          </td>
          <td className="c-table-content">
            {inputUsed ? (
              <StyledNumberInput
                placeholder={t('trailLength')}
                inputId="trackLength"
                unit={t('km')}
                minLimit={0}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.trackLength}
              />
            ) : (
              `${detailContent?.trackLength} ${t('km')}`
            )}
          </td>
        </tr>
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('altitude')}
          </td>
          <td className="c-table-content">
            {inputUsed ? (
              <StyledRangeInput
                inputId="altitude"
                minPlaceholder={t('minAltitude')}
                maxPlaceholder={t('maxAltitude')}
                unit="m"
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.altitude}
              />
            ) : (
              `${detailContent?.altitude?.min} - ${detailContent?.altitude?.max} m`
            )}
          </td>
        </tr>
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('pavementType')}
          </td>
          <td className="c-table-content">
            {inputUsed ? (
              <StyledTextInput
                placeholder={t('pavementPlaceholder')}
                inputId="trackCondition"
                wordLimit={20}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.trackCondition}
              />
            ) : (
              detailContent?.trackCondition
            )}
          </td>
        </tr>
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('park')}
          </td>
          <td className="c-table-content">
            {inputUsed ? (
              <StyledTextInput
                placeholder={t('parkPlaceholder')}
                inputId="belongingPark"
                wordLimit={20}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.belongingPark}
              />
            ) : (
              detailContent?.belongingPark
            )}
          </td>
        </tr>
        <tr>
          <td className={clsx('c-table-key', { inputUsed: inputUsed })}>
            {t('permit')}
          </td>
          <td className="c-table-content">
            {inputUsed && (
              <StyledRadioInput
                inputId="applicationNeeded"
                radioOptions={translatedRequirement}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.applicationNeeded}
              />
            )}
            {!inputUsed &&
              detailContent?.applicationNeeded === 'needed' &&
              t('common:requirement.needed')}
            {!inputUsed &&
              detailContent?.applicationNeeded === 'unNeeded' &&
              t('common:requirement.unNeeded')}
          </td>
        </tr>
        <tr>
          <td
            className={clsx('c-table-key', { inputUsed: inputUsed })}
            colSpan={2}
          >
            {t('routeInfo')}
          </td>
        </tr>
        <tr>
          <td className="c-table-content" colSpan={2}>
            {inputUsed ? (
              <StyledTextArea
                placeholder={t('enterRouteInfo')}
                inputId="trackIntroduction"
                wordLimit={150}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.trackIntroduction}
              />
            ) : (
              detailContent?.trackIntroduction
            )}
          </td>
        </tr>
        <tr>
          <td
            className={clsx('c-table-key', { inputUsed: inputUsed })}
            colSpan={2}
          >
            {t('trailMap')}
          </td>
        </tr>
        <tr>
          <td className="c-table-content" colSpan={2}>
            {inputUsed ? (
              <StyledImageInput
                activityMapUsed
                inputId="mapURL"
                defaultImgURL={defaultImageURL.activityMap}
                formContent={detailContent}
                onFormChange={onDetailChange}
                warning={formErrors?.mapURL}
              />
            ) : (
              <img
                className="o-hiking-table__image"
                src={detailContent?.mapURL || defaultImageURL.activityMap}
                alt="hiking map"
              />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const StyledHikingTable = styled(HikingTable)`
  width: 100%;

  .o-hiking-table__image {
    width: 100%;
  }
`;

export default StyledHikingTable;
