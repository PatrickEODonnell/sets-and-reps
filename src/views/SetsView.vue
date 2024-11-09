<template>
  <header>
    <PageHeading />
  </header>
  <TabHeading heading="S E T S" />
  <PageFooter />
  <div id="sets-list">
    <div class="set-row" v-for="set in sets" :key="set.id" @click="showSet(set.id)">
      {{ set.name }}
    </div>
  </div>
</template>
<script setup>
import PageFooter from "@/components/PageFooter.vue";
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import { useSetsService } from "../libs/idbSets";
import { ref, onMounted } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import { useRouter } from "vue-router";
const { getSets, initSets, getSetById } = useSetsService();
const store = useSetParamsStore();
let sets = ref([]);
const router = useRouter();

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
  console.log("On Mounted");
  sets.value = await getSets();
  if (sets.value.length == 0) {
    console.log("init sets:");
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
  border-radius: 20px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  padding: 20px;
  text-align: center;
}
</style>
