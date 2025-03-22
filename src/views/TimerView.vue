<template>
  <div id="container">
    <header>
      <PageHeading />
    </header>
    <main class="flex-grow-1">
      <TabHeading heading="W O R K O U T -- T I M E R" />
      <div v-if="showSetName" style="font-size: 24px;  color:#555;border: 1px;border-style: solid; border-radius: 15px; padding: 3px; text-align: center;">
    {{ setName }}
   </div>
      <SetTimerParms v-if="showTimerParms" :edit-mode="store.editMode" />
      <ExerciseList v-if="showExercises" />
      <ExerciseListEmom
        v-if="showExercisesEmom"
      />
      <SaveSet v-if="showSaveSet" />
      <LogSet v-if="showSaveLog" />
      <CountDownTimer v-if="showCountDownTimer" />
      <PlayTimer v-if="showPlaySet" />
    </main>
    <PageFooter />
  </div>
</template>
<script setup>
import { ref, computed,onMounted } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import SetTimerParms from "../components/SetTimerParms.vue";
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import PlayTimer from "../components/PlayTimer.vue";
import ExerciseList from "../components/ExerciseList.vue";
import ExerciseListEmom from "../components/ExerciseListEmom.vue";
import CountDownTimer from "../components/CountDownTimer.vue";
import SaveSet from "../components/SaveSet.vue";
import LogSet from "@/components/LogSet.vue";
import PageFooter from "../components/PageFooter.vue";
const store = useSetParamsStore();
let showSaveDialog = ref(false);

onMounted(() =>{
  console.log(store.editMode)
})
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
});
const setName = computed(() =>{
  return store.setName != "" ? store.setName : "New Timer/Set";
})
const showSetName = computed(() => {
  return store.editMode != "Log";
})
const showCountDownTimer = computed(() => {
  return store.editMode == "CountDown";
})
</script>
<style>
#container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.close-button {
  position: absolute; /* Position the button relative to the nearest positioned ancestor (box) */
  top: 10px; /* Adjust the top position as needed */
  right: 10px; /* Adjust the right position as needed */
  background-color: transparent; /* Make the background transparent */
  border: none; /* Remove the border */
  font-size: 20px; /* Adjust the font size */
  cursor: pointer; /* Change the cursor to a pointer on hover */
}

</style>
