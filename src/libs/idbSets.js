
const DB_NAME = 'setdb';
const DB_VERSION = 1;
const DT_SETS = "sets"
let DB;
const newSets = [
    {"name": "Pull Ups - Main", "setType": "Standard", "numOfSets": 6, "minPerSet": 2.5},
    {"name": "Upper Body Warm Ups", "setType": "Standard", "numOfSets": 2, "minPerSet": 2},
    {"name": "Pull Ups - Secondary", "setType": "Standard", "numOfSets": 3, "minPerSet": 3},
    {"name": "Core", "setType": "EMOM", "numOfSets": 3, "minPerSet": 1, "exerciseCount": 3},

]

export function useSetsService() {
	async function getDb() {
		return new Promise((resolve, reject) => {
			if(DB) { return resolve(DB); }
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore(DT_SETS, { autoIncrement: true, keyPath:'id' });
			};
		});
	}
    async function initSets(){
        newSets.forEach(async (set) => {
            await addSet(set);
          });
    }
	async function deleteSet(set) {

		let db = await getDb();

		return new Promise(resolve => {

			let trans = db.transaction([DT_SETS],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(DT_SETS);
			store.delete(set.id);
		});	
	}
	async function getSets() {

		let db = await getDb();

		return new Promise(resolve => {

			let trans = db.transaction([DT_SETS],'readonly');
			trans.oncomplete = () => {
				resolve(sets);
			};
			
			let store = trans.objectStore(DT_SETS);
			let sets = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					sets.push(cursor.value)
					cursor.continue();
				}
			};

		});
	}

    async function addSet(set) {

		let db = await getDb();
        console.log("Set:", set)
		return new Promise(resolve => {

			let trans = db.transaction([DT_SETS],'readwrite');
			trans.oncomplete = () => {
				let store = trans.objectStore(DT_SETS);
				const request = store.add(set);
					resolve(request.result);
			};

			// console.log("Request",request);
			// request.onsuccess = event => {
			// 	return resolve(request.result);
			// }
		});
    }

	async function saveSet(set) {

		let db = await getDb();

		return new Promise(resolve => {

			let trans = db.transaction([DT_SETS],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(DT_SETS);
			store.put(set);

		});
	
	}

    return {
        getSets,
        addSet,
        saveSet,
        deleteSet,
        initSets
      };
}
