export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email
export const usernameRegex = /^.{3,}$/; // at least 3 characters
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/; // at least 8 characters, 1 number, 1 special char

