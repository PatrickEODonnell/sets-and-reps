<template>
  <!-- Exercise Section-->
  <!-- <div id="exercise">
      <div v-for="exercise in store.exercises" :key="exercise">
        <div class="sets bold-14">
          <img src="../assets/dumbell.svg" />
          <p>{{ exercise }}</p>
          <p>x8</p>
        </div>
      </div>
    </div> -->

  <div id="exercise-list">
    <div id="card-heading"><h1>Exercises</h1></div>

    <div v-if="store.timerIsRunning">
      <div class="exercise-row" v-for="(exercise, index) in store.exercises" :key="exercise.seq">
        <div v-if="store.currentEmomSequence == index + 1">
          <span style="font-weight: 500"> Minute {{ index + 1 }} -- {{ exercise.name }}</span>
        </div>
        <div v-if="store.currentEmomSequence != index + 1">
          Minute {{ index + 1 }} --
          {{ exercise.name }}
        </div>
      </div>
    </div>
    <div v-if="!store.timerIsRunning">
      <div
        class="exercise-row"
        v-for="(exercise, index) in store.exercises"
        :key="exercise.sequence"
      >
        M{{ index + 1 }}
        <input
          type="text"
          v-model="exercise.name"
          @change="updateExercise($event, exercise.sequence)"
        />
      </div>
    </div>

    <div v-if="!store.timerIsRunning">
      <button class="form-button" @click="clearExercises">Clear All</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useSetParamsStore } from '@/libs/siteParams'
const store = useSetParamsStore()
function clearExercises() {
  store.clearExercises()
}
function updateExercise(event, sequence) {
  console.log(event.target.value, sequence)
  if (event.target.value == '') {
    store.deleteExercise(event.target.value, sequence)
    return
  }
  store.updateExercise(event.target.value, sequence)
}
</script>
<style scoped>
#exercise-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  position: relative;

  border-radius: 20px;
  border: 1px solid black;
}
#card-heading {
  display: inline-flex;
  padding: 0px 10px;
  align-items: center;
  gap: 0px;
  position: absolute;
  top: -17px;
  align-self: center;
  margin: 0;

  background-color: #ffffff;
}
#card-heading > h1 {
  font-size: 24px;
  font-weight: normal;
  margin: 0;
}
.exercise-row {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  /* border: 1px solid lightgray; */
  padding: 6px 20px;
  margin: 2px 0px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
}
</style>
