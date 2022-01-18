export const handleErrors = (errors) => {
  if (errors) {
    const _errors = {};
    const errorEntries = Object.entries(errors);
    errorEntries.forEach((err) => {
      _errors[err[0]] = err[1][0];
    });
    console.log("_errors", _errors);
    return _errors;
  }
};
