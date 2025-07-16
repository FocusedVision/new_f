export const ErrorMessage = {
  REQUIRED: {
    FIRSTNAME: 'First Name is required',
    LASTNAME: 'Last Name is required',
    EMAIL: 'Email address is required',
    PASSWORD: 'Password is required',
    CONFIRM_PASSWORD: 'Confirm password is required',
  },
  INVALID: {
    EMAIL: 'Please enter a valid email address',
    PASSWORD: 'Password must be at least 8 characters long',
    CONFIRM_PASSWORD: 'Passwords do not match',
  },
} as const;

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
} as const;

export const validateEmail = (email: string): string | null => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return ErrorMessage.REQUIRED.EMAIL;
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(trimmedEmail)) {
    return ErrorMessage.INVALID.EMAIL;
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return ErrorMessage.REQUIRED.PASSWORD;
  }

  if (password.length < 8) {
    return ErrorMessage.INVALID.PASSWORD;
  }

  return null;
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
): string | null => {
  if (!confirmPassword) {
    return ErrorMessage.REQUIRED.CONFIRM_PASSWORD;
  }

  if (confirmPassword !== password) {
    return ErrorMessage.INVALID.CONFIRM_PASSWORD;
  }

  return null;
};
