import taiwanDistricts from 'data/taiwanDistricts.json';
import { useTranslation } from 'react-i18next';

export const displayLocation = (location) => {
  const { i18n, t } = useTranslation('common');
  const isEn = i18n.language.startsWith('en');

  const districtsWithThreeWords = ['605', '849', '901', '963'];

  let locationNameArr = null;

  const locationCounty = t(`common:location.${location?.county}`);
  const locationDistrict = t(`common:district.${location?.district}`);

  const hasDetailed = location?.detail;
  const isThreeWordsDistrict = districtsWithThreeWords.some(
    (id) => id === location?.district
  );

  if (hasDetailed && !isThreeWordsDistrict) {
    locationNameArr = [
      isEn ? locationCounty : locationCounty?.slice(0, 2),
      isEn ? locationDistrict : locationDistrict?.slice(0, 2),
      location?.detail,
    ];
  } else if (hasDetailed && isThreeWordsDistrict) {
    locationNameArr = [
      isEn ? locationCounty : locationCounty?.slice(0, 2),
      isEn ? locationDistrict : locationDistrict?.slice(0, 3),
      location?.detail,
    ];
  } else {
    locationNameArr = [locationCounty, locationDistrict];
  }

  return isEn ? locationNameArr.reverse().join(', ') : locationNameArr.join('');
};

export const displayRegion = (location) => {
  const locationCounty = taiwanDistricts?.find(
    (county) => county?.id === location?.county
  );
  const locationDistrict = locationCounty?.districts?.find(
    (district) => district?.id === location?.district
  );

  if (location?.detail && location.district === '849') {
    return `${locationCounty?.name?.slice(0, 2)}${locationDistrict?.name?.slice(
      0,
      3
    )}`;
  } else {
    return `${locationCounty?.name?.slice(0, 2)}${locationDistrict?.name?.slice(
      0,
      2
    )}`;
  }
};
