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
    <div id="playing-exercises-container" v-if="displayExercises">
      <div>
        <div class="exercise-row-playing" v-for="exercise in store.exercises" :key="exercise.sequence">
          <span v-if="!exercise.measurement||exercise.measurement=='Reps'" style="font-size: 20px">{{ exercise.reps }}x - </span> 
          <span v-if="exercise.measurement" style="font-size: 20px">{{ exercise.reps }} {{ exercise.measurement }}&nbsp;- </span>
          <span style="font-size: 20px">{{ exercise.name }}</span>
        </div>
      </div>
    </div>
    <div id="edit-exercises-container" v-if="editExercises">
      <div style="font-weight: bold;text-align: center;padding: 2px;font-size: larger;">Choose 1-2/3-4 for warm ups</div>
        <div
          class="exercise-row"
          v-for="exercise in store.exercises"
          :key="exercise.sequence"
        >
        <div>
          <input type="text" v-model="exercise.reps" style="width: 60px;" />
          <input v-if="exercise.measurement" type="text" v-model="exercise.measurement" style="width:100px;margin-left:2px" />
          <input
            style="max-width: 160px; margin-left: 2px;"
            type="text"
            v-model="exercise.name"
            @change="updateExercise($event, exercise.sequence)"
          />
  <button @click.stop="deleteExercise" class="sr-button">
    <IconTrashCan style="vertical-align: middle;font-size: 18px;" />
</button>
          <!-- <input type="checkbox" v-model="exercise.log" style="" /> -->
        </div>
        <div v-if="exercise.options" style="font-size: smaller;padding-left: 5px;">Options: {{ exercise.options }}</div>
        </div>
    </div>



    <div v-if="editExercises" style="text-align: center;margin:5px;">
      <button  class="form-button" @click="clearExercises">Clear All</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import IconTrashCan from '~icons/mdi/trash-can';

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
  /* padding: 20px;
  gap: 10px; */
  position: relative;

  border-radius: 20px;
  border: 1px solid black;
}
#playing-exercises-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  position: relative;

}
#edit-exercises-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-top: 20px;
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
  margin-bottom: 10px;
  /* padding: 6px 20px;
  margin: 2px 0px; */
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
}
.exercise-row-playing {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  padding: 6px 20px;
  margin: 2px 0px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
}

</style>
