import { openDB } from 'idb';
const datasets = ["sets", "logs", "exercises"];
const DB_VERSION = 1;
const DB_NAME = "setdb";
let dbInstance;

export async function GetDb() {
  if (!dbInstance){
    dbInstance = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        console.log('Upgrading database...');
        for(const ds of datasets) {
          if (!db.objectStoreNames.contains(ds)) {
            db.createObjectStore(ds, { autoIncrement: true, keyPath: "id" });
          }
        }
        // treat setting as a separate object store because it does not set keyPath
        if (!db.objectStoreNames.contains('settings')){
            db.createObjectStore('settings');
        }
      }
    });
  }
  return dbInstance;
}
