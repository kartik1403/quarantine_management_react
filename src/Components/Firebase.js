import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyBCWAbHoqUpP0K0UEm7sRRCAwBCObc3RaI",
  authDomain: "covid-78818.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://covid-78818-default-rtdb.firebaseio.com",
  storageBucket: "covid-78818.appspot.com"
};

const abc = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(abc);
