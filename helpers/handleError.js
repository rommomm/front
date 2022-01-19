export const handleErrors = (errors) => {
  const _errors = {};
  const errorEntries = Object.entries(errors);
  errorEntries.forEach((err) => {
    _errors[err[0]] = err[1];
  });
  return _errors;
};
