// validation.js

export function validatePhoneNumber(phoneNumber) {
    // Basic phone number validation: must contain only numbers and be at least 10 digits
    const phoneNumberPattern = /^\d{10,}$/;
    return phoneNumberPattern.test(phoneNumber);
  }
  
  export function validateUsername(username) {
    // Basic username validation: must contain only letters and numbers, and be between 3 to 20 characters
    const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
    return usernamePattern.test(username);
  }
  
  export function validateEmail(email) {
    // Basic email validation: must follow the email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  