<template>
  <header>
    <PageHeading />
  </header>
  <TabHeading heading="W O R K O U T - S E G M E N T S" />
  <div id="sets-list">
    <SetsListItem
      v-for="set in sets"
      :key="set.id"
      :set="set"
      @delete="handleSetDelete"
      @click="showSet(set.id, set.source)"
    />
  </div>
  <PageFooter />
  <!-- <div id="sets-list">
    <div class="set-row" v-for="set in sets" :key="set.id" @click="showSet(set.id)">
      <div style="display: flex; justify-content: space-between; align-items: center;">
  <div>
    <button @click.stop="expand(set.id)" class="expand-button">
      <IconPlus style="vertical-align: middle;" />
    </button>
    <span style="vertical-align: middle;">{{ set.id }}: {{ set.name }}</span>
  </div>
  <IconTrashCan style="vertical-align: middle;" />
</div>
      <div v-if="expandedId == set.id" class="set-details">
        {{ set.setType }}: {{ set.minPerSet }}mins/set for {{ set.numOfSets }} sets
      </div>
      <div v-if="expandedId == set.id" class="set-details">
        Exercises:
        <span v-for="(ex, sequence) in set.exercises" :key="sequence"><br />{{ ex.name }}</span>
      </div>
    </div>
  </div> -->
</template>
<script setup>
import PageFooter from "@/components/PageFooter.vue";
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import { ref, onMounted, computed } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import { useRouter } from "vue-router";
import SetsListItem from "@/components/SetsListItem.vue";
import { useIdbservice } from "@/libs/useIdbService";
import { defaultSets } from "@/libs/sets";
const { getAll, getById, deleteById: deleteSet } = useIdbservice("sets");
const store = useSetParamsStore();
let sets = ref([]);

const router = useRouter();
const handleSetDelete = async (id) => {
  console.log(id);
  // await deleteById(id);
  await deleteSet(id);
  await refreshSets();
};
async function refreshSets() {
  // sets.value = await getSets();
  sets.value = await getAll();
  console.log("sets", sets.value);
  addDefaults();
  sets.value.sort((a, b) => a.name.localeCompare(b.name));
}
function addDefaults() {
  store.defSets.forEach((set) => {
    sets.value.push(set);
  });
}
async function showSet(setId, source) {
  console.log(setId);
  let set = {};
  if (source == "D") {
    // default sets
    set = sets.value.find((s) => s.id == setId);
  } else {
    set = await getById(setId);
  }
  store.setType = set.setType;
  store.sets = set.numOfSets;
  store.setName = set.name;
  store.secondsOff = set.secondsOff;
  store.secondsOn = set.secondsOn;
  store.setId = set.id;
  store.movementType = set.movement;
  store.sectionType = set.section;
  if (set.exercises) {
    for (let i = 0; i < set.exercises.length; i++) {
      store.addExercise(set.exercises[i]);
    }
    store.exercises = set.exercises;
  } else {
    store.clearExercises();
  }
  store.editMode = "Edit";
  store.updateMinPerSet(set.minPerSet);
  store.undoDisabled = true;
  store.saveOriginalSet();
  router.push("/");
  console.log("undoDisabled", store.undoDisabled);
}

onMounted(async () => {
  await refreshSets();
});
</script>

<style scoped>
#sets-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  position: relative;
  margin: 25px;
}
.set-row {
  border: 1px solid darkgray;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  padding: 10px;
  text-align: left;
}
.expand-button {
  align-self: center;
  overflow: hidden;

  border-radius: 25px;
  border: none;
}
.set-details {
  padding: 6px 3px 3px 10px;
  font-size: smaller;
}
</style>
