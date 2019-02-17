/**
 * If condition fails, an error will occur and message
 * will be shown.
 *
 * @param {boolean} condition Condition to be checked.
 * @param {string} message Message to display if an assertion failed.
 */
const assert = (condition, message) => {
  if (!condition) {
    throw message || 'Assertion failed!';
  }
};

export default assert;
