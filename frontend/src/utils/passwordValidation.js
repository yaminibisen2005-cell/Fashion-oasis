/**
 * Password validation utility for Fashion Oasis
 */

export const validatePasswordStrength = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (/\s/.test(password)) {
    return "Password cannot contain spaces";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (password.length > 32) {
    return "Password cannot exceed 32 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter (A-Z)";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter (a-z)";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number (0-9)";
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
    return "Password must contain at least one special character (e.g. !@#$%^&*)";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};
