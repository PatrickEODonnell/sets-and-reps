const DB_NAME = "setdb";
const DB_VERSION = 4;
const datasets = ["sets", "logs"]
// let DB;
export function useIdbservice(dataset) {

  function getDb() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        let db = e.target.result;
        datasets.forEach(ds => {
          if (!db.objectStoreNames.contains(ds)){
            const objectStore = db.createObjectStore(ds, { autoIncrement: true, keyPath: "id" });
          }
          });
    };

      request.onerror = (e) => {
        alert("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e) => {
        console.log("Get Database onsuccess");
        const db = e.target.result;
        resolve(db);
      };

    });
  }
  async function addItem(item) {
    console.log("AddItem called");
    let db = await getDb();
    console.log("DB",db)
    return new Promise((resolve,reject) => {
      console.log("Inside Promis");
      let trans = db.transaction([dataset], "readwrite");
      let store = trans.objectStore(dataset);
      const request = store.add(item);
      request.onsuccess = (event) => {
        resolve(event.target.result);
      }
      request.onerror = (event) => {
        reject(new Error("Error adding item: " + event.target.error));
      }
  });
  }

      async function deleteById(id) {
        let db = await getDb();
        return new Promise((resolve,reject) => {
          console.log("Inside Delete Promise");
          let trans = db.transaction([dataset], "readwrite");
          let store = trans.objectStore(dataset);
          const request = store.delete(id);
          request.onsuccess = (event) => {
            resolve("Item deleted");
          }
          request.onerror = (event) => {
            reject(new Error("Error adding item: " + event.target.error));
          }
       
        });
     }
     async function saveItem(item) {
        let db = await getDb();
        return new Promise((resolve,reject) => {
          console.log("Inside Save Promise");
          let trans = db.transaction([dataset], "readwrite");
          let store = trans.objectStore(dataset);
          const request = store.put(item);
          request.onsuccess = (event) => {
            resolve("Item saved");
          }
          request.onerror = (event) => {
            reject(new Error("Error adding item: " + event.target.error));
          }
       
        });
      }
      async function getById(id) {
        let db = await getDb();

        return new Promise((resolve,reject) => {
          console.log("Inside get Promise");
          let trans = db.transaction([dataset], "readonly");
          let store = trans.objectStore(dataset);
          const request = store.get(id);
          request.onsuccess = (event) => {
            resolve(event.target.result);
          }
          request.onerror = (event) => {
            reject(new Error("Error adding item: " + event.target.error));
          }
       
        });
      }
     async function getAll(){
        let db = await getDb();
        return new Promise((resolve,reject) => {
          console.log("Inside get all Promise");
          let items = [];
          let trans = db.transaction([dataset], "readonly");
          let store = trans.objectStore(dataset);
          const request = store.openCursor();
          request.onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
              items.push(cursor.value);
              cursor.continue();
            } else {
              resolve(items);
            }
          }
          request.onerror = (event) => {
            reject(new Error("Error adding item: " + event.target.error));
          }
        });
    }
    return {
      saveItem,
      deleteById,
      getById,
      getAll,
      addItem,
    }
}