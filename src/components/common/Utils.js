export const toSlug = (text) => {
  if (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  return "";
};

const convertToCamelCase = (title) => {
  // Remove spaces and convert to camelCase
  return title.replace(/\s+(.)/g, (match, group) => group.toUpperCase());
};

export const convertToFieldName = (title) => {
  const camelCaseTitle = convertToCamelCase(title);
  // Ensure the first character is lowercase
  return camelCaseTitle.charAt(0).toLowerCase() + camelCaseTitle.slice(1);
};
