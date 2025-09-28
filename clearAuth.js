// Quick script to clear authentication data for testing
// Run this in your browser console when testing the web version
// or modify App.tsx temporarily

console.log('Clearing authentication data...');

// Clear localStorage (web version)
if (typeof localStorage !== 'undefined') {
  localStorage.removeItem('SS_AUTH_DONE');
  localStorage.removeItem('SS_USER_PROFILE');
  console.log('Web storage cleared');
}

// For React Native, you can temporarily add this to App.tsx:
/*
import { removeItem } from './utils/storage';

// Add this inside useEffect in App.tsx temporarily:
await removeItem('SS_AUTH_DONE');
await removeItem('SS_USER_PROFILE');
console.log('Mobile storage cleared');
*/

console.log('Authentication data cleared! Refresh the app.');