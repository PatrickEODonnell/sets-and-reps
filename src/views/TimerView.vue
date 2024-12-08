<template>
  <div id="container">
    <header>
      <PageHeading />
    </header>
    <main class="flex-grow-1">
      <TabHeading heading="W O R K O U T -- T I M E R" />
      <SetTimerParms v-if="showTimerParms" :edit-mode="store.editMode" />
      <ExerciseList v-if="showExercises" />
      <ExerciseListEmom
        v-if="showExercisesEmom"
      />
      <SaveSet v-if="showSaveSet" />
      <LogSet v-if="showSaveLog" />
      <PlayTimer v-if="showPlaySet" />
    </main>
    <PageFooter />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import SetTimerParms from "../components/SetTimerParms.vue";
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import PlayTimer from "../components/PlayTimer.vue";
import ExerciseList from "../components/ExerciseList.vue";
import ExerciseListEmom from "../components/ExerciseListEmom.vue";
import SaveSet from "../components/SaveSet.vue";
import LogSet from "@/components/LogSet.vue";
import PageFooter from "../components/PageFooter.vue";
const store = useSetParamsStore();
let setName = ref("");
let showSaveDialog = ref(false);

const showExercises = computed(() => {
  return (store.editMode == "Add" || store.editMode == "Edit" || store.editMode == "Play") && store.setType != "EMOM" && store.exercises.length > 0;
})
const showTimerParms = computed(() => {
  return store.editMode == "Add" || store.editMode == "Edit" 
})
const showPlaySet = computed(() => {
  return store.editMode == "Play" || store.editMode == "Add" || store.editMode == "Edit" 
})
const showSaveLog = computed(() => {
  return store.editMode == "Log"
})
const showSaveSet = computed(() => {
  return store.editMode == "Save"
})
const showExercisesEmom = computed(() => {
  return (store.editMode == "Add" || store.editMode == "Edit" || store.editMode == "Play") && store.setType == "EMOM" && store.exercises.length > 0;
})
</script>
<style>
#container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
