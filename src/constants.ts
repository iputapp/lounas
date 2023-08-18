/**
 * @constant {number} STUDENT_ID_LENGTH
 *
 * Length of `student ID`
 */
export const STUDENT_ID_LENGTH = 6;

/**
 * @constant {RegExp} STUDENT_ID_REGEX
 *
 * Regex of `student ID`
 */
export const STUDENT_ID_REGEX = /^2[0-9]{5}$/;

/**
 * @constant {string} EMAIL_DOMAIN
 *
 * Domain of `email`
 */
export const EMAIL_DOMAIN = "tks.iput.ac.jp";

/**
 * @constant {number} VERIFY_DIGITS_LENGTH
 *
 * Length of `verify digits`
 */
export const VERIFY_DIGITS_LENGTH = 6;

/**
 * @constant {RegExp} VERIFY_DIGITS_REGEX
 *
 * Regex of `verify digits`
 */
export const VERIFY_DIGITS_REGEX = /^[0-9]{6}$/;

/**
 * @constant {Array<string>} PAYMENTS
 *
 * List of `payment`
 */
export const PAYMENTS = ["現金", "PayPay", "交通系IC"];
