import { useTranslation } from 'react-i18next';

export const switchDifficulty = (difficulty, abbrev = false) => {
  const { t } = useTranslation(['common']);

  let difficultyText = '';

  switch (difficulty) {
    case 'beginner':
      difficultyText = t('common:difficulties.beginner');
      break;
    case 'medium':
      difficultyText = t('common:difficulties.medium');
      break;
    case 'advanced':
      difficultyText = t('common:difficulties.advanced');
      break;
    case 'expert':
      difficultyText = t('common:difficulties.expert');
      break;
    case 'master':
      difficultyText = t('common:difficulties.master');
      break;
    default:
      break;
  }

  return abbrev ? difficultyText.slice(0, 3) + '.' : difficultyText;
};
