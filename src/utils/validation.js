/**
 * Verifies email formatting against standard pattern.
 */
export function validateEmail(email) {
  if (!email?.trim()) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address format';
  return null;
}

/**
 * Verifies website/portfolio URL formatting.
 */
export function validateUrl(url) {
  if (!url?.trim()) return null; // Optional fields return null if empty
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlRegex.test(url)) return 'Invalid URL format (e.g., https://johndoe.dev)';
  return null;
}

/**
 * Validates logical ordering of start and end dates.
 */
export function validateDateRange(startDate, endDate, current = false) {
  if (!startDate) return null;
  if (current) return null;
  if (!endDate) return null;
  
  if (new Date(startDate) > new Date(endDate)) {
    return 'Start date cannot be after end date';
  }
  return null;
}

/**
 * Verifies required fields are not empty.
 */
export function validateRequired(value, fieldName = 'Field') {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return null;
}
