<template>
  <header>
    <PageHeading />
  </header>
  <TabHeading heading="S E T S" />
  <PageFooter />
  <div id="sets-list">
    <div class="set-row" v-for="set in sets" :key="set.id" @click="showSet(set.id)">
      <button @click.stop="expand(set.id)" class="expand-button">
        <img id="play-pause" src="../assets/add.svg" />
      </button>
      {{ set.name }}
      <div v-if="expandedId == set.id" class="set-details">
        {{ set.setType }}: {{ set.minPerSet }}mins/set for {{ set.numOfSets }} sets
      </div>
      <div v-if="expandedId == set.id" class="set-details">
        Exercises:
        <span v-for="(ex, sequence) in set.exercises" :key="sequence"><br />{{ ex.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import PageFooter from "@/components/PageFooter.vue";
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import { useSetsService } from "../libs/idbSets";
import { ref, onMounted, computed } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import { useRouter } from "vue-router";
const { getSets, initSets, getSetById } = useSetsService();
const store = useSetParamsStore();
let sets = ref([]);
const router = useRouter();
const expandedId = ref(0);
function expand(id) {
  if (expandedId.value == id) {
    expandedId.value = 0;
  } else {
    expandedId.value = id;
  }
}
async function showSet(setId) {
  console.log(setId);
  let set = await getSetById(setId);
  console.log(set);
  store.setType = set.setType;
  store.sets = set.numOfSets;
  store.setName = set.name;
  store.secondsOff = set.secondsOff;
  store.secondsOn = set.secondsOn;
  store.setId = set.id;
  if (set.exercises) {
    console.log("exercises: ", set.exercises);
    for (let i = 0; i < set.exercises.length; i++) {
      store.addExercise(set.exercises[i]);
    }
    store.exercises = set.exercises;
  } else {
    store.clearExercises();
  }
  store.updateMinPerSet(set.minPerSet);
  router.push("/");
}

onMounted(async () => {
  sets.value = await getSets();
  sets.value.sort((a, b) => a.name.localeCompare(b.name));
  console.log("Sets:", sets.value);
  if (sets.value.length == 0) {
    initSets();
  }
});
</script>

<style scoped>
#sets-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
  position: relative;
  /* border-radius: 20px;
  border: 1px solid black; */
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
  /* width: 100px;
  height: 35px; */
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
