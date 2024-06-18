<template>
  <header>
    <PageHeading />
  </header>
  <main>
    <TabHeading heading="Workout Timer" />
    <SetTimerParms :timerDetails="timerDetails" @on-change-params="onChangeParams" />
    <PlayTimer :timerDetails="timerDetails" />
  </main>
</template>
<script setup>
import { ref } from 'vue'
import SetTimerParms from '../components/SetTimerParms.vue'
import PageHeading from '../components/PageHeading.vue'
import TabHeading from '../components/TabHeading.vue'
import PlayTimer from '../components/PlayTimer.vue'

let timerDetails = ref({
  name: '',
  set_type: 'Standard',
  sets: 4,
  min_per_set: 3,
  interval: 1,
  interval_off: 10,
  exercise_count: 0
})
const onChangeParams = (params) => {
  timerDetails.value.name = params.name
  timerDetails.value.interval = params.interval
  timerDetails.value.interval_off = params.interval_off
  timerDetails.value.min_per_set = params.min_per_set
  timerDetails.value.set_type = params.set_type
  timerDetails.value.sets = params.sets
  timerDetails.value.exercise_count = params.exercise_count
  console.log('TimerView', 'onChangeParams', timerDetails.value)
}
</script>
