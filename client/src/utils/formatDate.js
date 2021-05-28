// javascript has a New Internationalization API to format Dates, Numbers & Strings
// according to users different languages & locations.
// This help support different languages in our app for users around the world.

//  Locale is a String that defines the user's language & country eg. 'en-US'
// navigator.language - To get Current Browser's Locale (en-US or others)
const locale = navigator.language;

// DateTimeFormat() for dates & times
// format() - pass in a Date that we want to format
// first arg is current browser's locale - language
function formatDate(date) {
  // new Date(dateString) - creates a new date object from a date string
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}

export default formatDate;
