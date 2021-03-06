import Head from 'next/head';
// generate IDs (unique keys for React rendering)
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const storageKey = 'userList'

export function getMetaWithTitle(title) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="keywords" content="react, contact, manager" />
      <meta name="author" content="Borghese-Gladiator" />
      <meta name="description" content="Quick utility to track people I talked to and how long ago it was. I built this since existing solutions I found were CRM tools" />
      <meta name="audience" content="Everyone" />
    </Head>
  )
}

/**
 * @param momentDate - Moment date object
 * @return string to display time of last talk
 */
 export function getMomentText(momentDateLastTalked) {
  const today = new moment();
  const daysDiff = today.diff(momentDateLastTalked, 'days')
  const daysText = daysDiff === 1 ? "day" : "days";
  return `${daysDiff} ${daysText} ago`
}


/**
 * @param dateLastTalked - JavaScript date object
 */
export function getDateText(dateLastTalked) {
  const today = new Date();
  const lastTalk = new Date(JSON.parse(dateLastTalked));
  const numDaysDiff = dateDifference(today, lastTalk);
  const daysText = numDaysDiff === 1 ? "day" : "days";
  return `${numDaysDiff} ${daysText} ago`
}

/**
 * Shorten descriptions and use ellipsis if too long
 * @param str
 */
export function truncateStr(str, num=30) {
  return str.length > num ? str.substring(0, num) + "..." : str;
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

export function createApptItem(date) {
  return {
    id: uuidv4(),
    date: date,
    dateText: getDateText(date)
  }
}

export function createNoteItem(text) {
  return {
    id: uuidv4(),
    text: text
  }
}

/**
 * Create user with added values
 * @param name
 * @param shortBio - description of who this is
 */
export function generateUserObject({ name, placeLastTalked, dateLastTalked, bio, contact }) {
  // notesList: [ { id, text }]
  // appointment: { date, location }
  return {
    id: uuidv4(),
    name,
    placeLastTalked,
    dateLastTalked,
    notesList: [],
    appointment: null,
    bio: bio === null ? "": bio,
    contact: contact === null ? "": contact,
  }
}