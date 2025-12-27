export const sliceIntroduction = (introduction, wordLimit) => {
  let introductionSlice = introduction;
  if (introductionSlice?.length > wordLimit)
    introductionSlice = `${introduction?.slice(0, wordLimit)} ...`;
  return introductionSlice;
};
