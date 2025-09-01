// Utility functions for greetings and other common functionality

/**
 * Get greeting based on time of day
 * @returns {string} Appropriate greeting message
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning!";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon!";
  } else if (hour >= 17 && hour < 22) {
    return "Good Evening!";
  } else {
    return "Good Night!";
  }
};

/**
 * Get greeting with custom time ranges
 * @param {number} morningStart - Start hour for morning (default: 5)
 * @param {number} afternoonStart - Start hour for afternoon (default: 12)
 * @param {number} eveningStart - Start hour for evening (default: 17)
 * @param {number} nightStart - Start hour for night (default: 22)
 * @returns {string} Appropriate greeting message
 */
export const getCustomGreeting = (
  morningStart: number = 5,
  afternoonStart: number = 12,
  eveningStart: number = 17,
  nightStart: number = 22
): string => {
  const hour = new Date().getHours();

  if (hour >= morningStart && hour < afternoonStart) {
    return "Good Morning!";
  } else if (hour >= afternoonStart && hour < eveningStart) {
    return "Good Afternoon!";
  } else if (hour >= eveningStart && hour < nightStart) {
    return "Good Evening!";
  } else {
    return "Good Night!";
  }
};

/**
 * Get current time in 12-hour format
 * @returns {string} Current time (e.g., "2:30 PM")
 */
export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Get current date in readable format
 * @returns {string} Current date (e.g., "Monday, January 15, 2024")
 */
export const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
