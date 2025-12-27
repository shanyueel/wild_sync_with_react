export const asyncForEach = async (array, callback) => {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      await callback(array[i], i, array);
    }
  }
};
