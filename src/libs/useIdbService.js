import { db } from "./idb.js";
const DB_NAME = "setdb";
const DB_VERSION = 1;
const datasets = ["sets", "logs", "exercises"];

// let DB;
export function useIdbservice(dataset) {

  async function addItem(item) {
    await db.add(dataset, item);
  }

      async function deleteById(id) {
        await db.delete(dataset, id);
     }
     async function saveItem(item) {
        const key = await db.put(dataset, item);
      }

      async function getById(id) {
        const item = await db.get(dataset,id);
        return item;
      }

     async function getAll(){
      const items = await db.getAll(dataset);
      return items;
    }
    return {
      saveItem,
      deleteById,
      getById,
      getAll,
      addItem,
    }
}