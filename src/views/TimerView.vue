<template>
  <header>
    <PageHeading />
  </header>
  <main>
    <TabHeading heading="W O R K O U T -- T I M E R" />
    <SetTimerParms v-if="store.showTimerParms" />
    <ExerciseList v-if="store.showExercises && store.setType != 'EMOM'" />
    <ExerciseListEmom v-if="store.showExercises && store.setType == 'EMOM'" />
    <PlayTimer />
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useSetParamsStore } from '@/libs/siteParams'
import SetTimerParms from '../components/SetTimerParms.vue'
import PageHeading from '../components/PageHeading.vue'
import TabHeading from '../components/TabHeading.vue'
import PlayTimer from '../components/PlayTimer.vue'
import ExerciseList from '../components/ExerciseList.vue'
import ExerciseListEmom from '../components/ExerciseListEmom.vue'
const store = useSetParamsStore()
</script>
