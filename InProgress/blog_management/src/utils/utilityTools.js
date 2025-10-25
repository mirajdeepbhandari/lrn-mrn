export const searchPreprocessing = (search) => {
  if (!search) return ""; // handle null or undefined
  return search.toLowerCase().trim();
};
