import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// PUT function to update data in the database
export const putDb = async (content) => {

  console.log('Updating the database');
  // Connecting to the database (jate), and listing the version number (1)
  const noteDB = await openDB('jate', 1);
  // Makes a new transaction for the database (jate) and setting it to readwrite which allows it to be edited
  const tx = noteDB.transaction('jate', 'readwrite');
  // Opens the object store for the database (jate)
  const oStore = tx.objectStore('jate');
  // Request to put data into the object store
  const req = oStore.put({ id: 0, content: content })
  // Wait until the data is added
  const res = await req;
  console.log('data is now saved', res);
};

// TODO: Add logic for a method that gets all the content from the database
// GET function to grab data from the database
export const getDb = async () => {

  console.log('Getting data from the database');
  // Connecting to the database (jate), and listing the version number (1)
  const noteDB = await openDB('jate', 1);
  // Makes a new transaction for the database (jate) and setting it to readonly which makes it so it cant be edited
  const tx = noteDB.transaction('jate', 'readonly');
  // Opens the object store for the database (jate)
  const oStore = tx.objectStore('jate');
  // Request to get all data from the object store
  const req = oStore.getAll();
  // Wait until the data is added
  const res = await req;
  console.log('res.value', res);
};

initdb();

