export const switchDifficulty = (difficulty) => {
  switch (difficulty) {
    case 'beginner':
      return '入門';
    case 'medium':
      return '中等';
    case 'advanced':
      return '進階';
    case 'expert':
      return '專家';
    case 'master':
      return '大師';
    default:
      return;
  }
};
