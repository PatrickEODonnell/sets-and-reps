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

    <div v-if="displayExercises">
      <div class="exercise-row" v-for="exercise in store.exercises" :key="exercise.sequence">
        <span style="font-size: 20px">{{ exercise.reps }}</span> x
        <span style="font-size: 20px">{{ exercise.name }}</span>
      </div>
    </div>
    <div v-if="editExercises">
      <div
        style="display: flex"
        class="exercise-row"
        v-for="exercise in store.exercises"
        :key="exercise.sequence"
      >
        <input type="text" v-model="exercise.reps" style="width: 70px; margin-right: 5px" />
        <input
          style="width: 175px"
          type="text"
          v-model="exercise.name"
          @change="updateExercise($event, exercise.sequence)"
        />
        <input type="checkbox" v-model="exercise.log" style="" />
      </div>
    </div>
    <div v-if="editExercises">
      <button class="form-button" @click="clearExercises">Clear All</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
const store = useSetParamsStore();

function clearExercises() {
  store.clearExercises();
}
function updateExercise(event, sequence) {
  console.log(event.target.value, sequence);
  if (event.target.value == "") {
    store.deleteExercise(event.target.value, sequence);
    return;
  }
  store.updateExercise(event.target.value, sequence);
}
const displayExercises = computed(() => {
  return store.editMode == "Play";
});
const editExercises = computed(() => {
  return store.editMode == "Add" || store.editMode == "Edit";
});
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
