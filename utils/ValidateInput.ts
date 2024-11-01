const validateInput = (text: string, emptyStringIsValid?: boolean): boolean => {
  if (
    /^(\d+)-(\d+)"$/.test(text) || // matches 10-10"
    /^(\d+)-(\d+)$/.test(text) || // matches 10-10
    /^(\d+)'-?(\d+)"$/.test(text) || // matches 10'-10"
    /^(\d+)'-?(\d+)$/.test(text) || // matches 10'-10
    /^\d+$/.test(text) || // matches 10
    /^(\d+)'$/.test(text) || // matches 10'
    /^(\d+)"/.test(text) || // matches 10"
    /^(\d+)'?(\d+)"$/.test(text) // matches 10'10"
  ) {
    return true;
  } else {
    // matches ""
    if (emptyStringIsValid && /^$/.test(text)) {
      return true;
    }
    return false;
  }
};

export default validateInput;
