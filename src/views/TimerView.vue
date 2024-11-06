<template>
  <div id="container">
    <header>
      <PageHeading />
    </header>
    <main class="flex-grow-1">
      <TabHeading heading="W O R K O U T -- T I M E R" />
      <SetTimerParms v-if="store.showTimerParms && !store.showSaveSet" :edit-mode="editMode" />
      <ExerciseList v-if="store.showExercises && store.setType != 'EMOM' && !store.showSaveSet" />
      <ExerciseListEmom
        v-if="store.showExercises && store.setType == 'EMOM' && !store.showSaveSet"
      />
      <SaveSet v-if="!store.timerIsRunning" />
      <PlayTimer v-if="!store.showSaveSet" />
    </main>
    <PageFooter />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import SetTimerParms from "../components/SetTimerParms.vue";
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import PlayTimer from "../components/PlayTimer.vue";
import ExerciseList from "../components/ExerciseList.vue";
import ExerciseListEmom from "../components/ExerciseListEmom.vue";
import SaveSet from "../components/SaveSet.vue";
import PageFooter from "../components/PageFooter.vue";
const store = useSetParamsStore();
let setName = ref("");
let showSaveDialog = ref(false);
let showSaveSet = ref(false);
let editMode = ref("Add");
function saveSet() {}
</script>
<style>
#container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
