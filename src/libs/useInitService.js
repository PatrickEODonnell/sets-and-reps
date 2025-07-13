import { db } from "./idb.js";
import { defaultSets } from "./sets.js";
import { EXERCISE_LIST } from "./exercises.js";
export function useInitService() {
  
    async function hasBeenInitialized() {
        console.log("Checking if data has been initialized...");
        return await db.get('settings', 'initialized') !== undefined;
    }

    async function initializeSets() {
        const initialized = await hasBeenInitialized();
        console.log("Initialization check result:", initialized);
        if (!initialized) {
            console.log("write out set and exercise data");
            // write out default sets
            for (const set of defaultSets) {
                await db.put('sets', set);
            }
            for (const exercise of EXERCISE_LIST) {
                await db.put('exercises', exercise);
            }   
            // set initialized flag
            await db.put('settings', true, 'initialized');
            console.log('Data initialized');
        } else {
            console.log('Data already initialized, skipping...');
        }
    }

  return {
    hasBeenInitialized,
    initializeSets
  };
}