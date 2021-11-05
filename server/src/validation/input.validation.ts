export function checkNumber(number: number): boolean {
  return number !== undefined && number !== null && !isNaN(number);
}

export function checkBoolean(boolean: any): boolean {
  return boolean === true || boolean === false;
}

export function checkSpecialCharacters(string: string): boolean {
  return !/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(string);
}
