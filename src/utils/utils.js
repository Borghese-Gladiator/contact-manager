// generate IDs (unique keys for React rendering)
import { v4 as uuidv4 } from 'uuid';

export const storageKey = 'userList'

/**
 * Shorten descriptions and use ellipsis if too long
 * @param str
 */
export function truncateDescription(str) {
  return str.length > 20 ? str.substring(0, 20) + "..." : str;
}

/**
 * Capitalize only the first letter of the string
 * @param str
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Calculate difference between two JS Date objects
 * @param date2
 * @param date1
 */
export function dateDifference(date2, date1) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// POTENTIAL SERVER FUNCTIONS

/**
 * Create user with added values
 * @param name
 * @param shortBio - description of who this is
 */
export function generateUserObject({ name, shortBio }) {
  return {
    id: uuidv4(),
    name: name,
    shortBio: shortBio,
    contactMethod: "Text",
    notesList: [
      { id: uuidv4(), text: "Fall 2022 - going study abroad in Trinity College in Ireland", done: false },
      { id: uuidv4(), text: "Spring 2021 - peer mentor (not even starting Zoom calls, but paid for like 7~ hours of work a week)", done: false },
    ],
    dateLastTalked: JSON.stringify(new Date()),
    placeLastTalked: "Boston Badminton"
  }
}