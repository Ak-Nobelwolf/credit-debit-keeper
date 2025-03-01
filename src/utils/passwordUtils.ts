
/**
 * Validates password strength and returns an array of error messages.
 * @param password The password to validate
 * @returns A tuple with [errors, strength] where errors is an array of error messages and strength is a number from 0-5
 */
export const validatePassword = (password: string): [string[], number] => {
  const errors: string[] = [];
  let strength = 0;

  if (password.length < 8) {
    errors.push("At least 8 characters");
  } else {
    strength += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("At least one uppercase letter");
  } else {
    strength += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("At least one lowercase letter");
  } else {
    strength += 1;
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("At least one number");
  } else {
    strength += 1;
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("At least one special character");
  } else {
    strength += 1;
  }

  return [errors, strength];
};

/**
 * Checks if a password is valid (meets all requirements)
 */
export const isPasswordValid = (password: string): boolean => {
  const [errors] = validatePassword(password);
  return errors.length === 0;
};
