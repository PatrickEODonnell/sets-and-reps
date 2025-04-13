<template>
<!-- <div>
    <div class="row">
        <div>Add Exercise</div>
    </div>
    <div class="row">
        <div class="column">
            <div>Reps:</div>
            <div><input  style="width: 70px;" type="number" v-model="reps" /></div>
        </div>
        <div class="column">
            <div>Exercise:</div>
            <div><input  style="width: 120px;" type="text" v-model="exercise" /></div>
        </div>
        <div class="column">
            
        </div>
    </div>
</div> -->
<div style="display: flex;  align-items: center;">
  <!-- Input Fields -->
  <div style="margin-right: 2%;">
    <label for="reps" style="display: block;">Reps</label>
    <input id="reps" type="text" style="width: 70px;" v-model="reps" />
  </div>
  <div style="margin-right: 2%;">
    <label for="exercise" style="display: block;">Exercise</label>
    <input id="exercise" type="text" style="width: 175px;" v-model="exerciseName" />
  </div>
  <div style="margin-right: 5px; margin-top: 20px;">
    <div style="display: block;">Log</div>
    <div class="sr-button" ><input type="checkbox"  v-model="log"/></div>
</div>
  
  <!-- Save Button -->
  <button class="sr-button" style="vertical-align: bottom;padding-top: 20px;" @click="saveExercise"><IconPlus style="font-size: 20;" /></button>
</div>
</template>
<script setup>
import { ref } from 'vue';
import IconPlus from '~icons/mdi/plus';
let reps = ref(8);
let exerciseName = ref("");
let log = ref(false);
const emit = defineEmits(['save'])
const saveExercise = () => { 
  let exercise = { reps: reps.value, name: exerciseName.value, log: log.value };
  console.log("AddExToSet:", exercise);
  emit('save',exercise);
  reps.value = ""
  exerciseName.value = "";
  log.value = false;
};

</script>