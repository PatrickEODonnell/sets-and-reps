<template>
    <div>
        <div id="timer-input" >
    <div>
      <div id="edit-heading"><h1>Log {{store.setName}}</h1></div>
      <div style="display: flex;  align-items: right;">
        <button @click="cancel" class="close-button">
            <IconCloseCircleOutline  />
          </button>
      </div>

      <div><strong>{{ store.setName }}</strong> completed at  {{ store.getCurrentTime }}</div>
      <div class="row" style="margin-top: 10px;">
        <div class="column">
          <div>Notes:</div>
          <div>
            <div><textarea id="notes" v-model="logNotes"></textarea></div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="column">
          <div>Personal Record/Progress:</div>
        </div>
      </div>
      <div v-for="ex in prs" :key="ex.sequence" class="row" style="margin-top: 5px;">
        <div class="column">
          <div>
            <div>{{ ex.name }}</div>
          </div>
        </div>
        <div class="column">
          <div>
            <div><input type="text" v-model="ex.pr" style="width: 100px;"></div>
          </div>
        </div>
      </div>
      <div class="row">&nbsp;</div>
      <div class="row">
        <!-- <div class="column">
          <button @click="cancel" class="sr-button">
            <IconCloseCircleOutline style="font-size: 35px; vertical-align: middle;" />
          </button>
        </div> -->
        <div class="column">
          <button @click="saveLog" class="form-button">
            <p>Save Progress</p>
          </button>
        </div>
      </div>
    </div>
  </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useSetParamsStore } from '@/libs/siteParams';
import IconCloseCircleOutline from '~icons/mdi/close-circle-outline';

const store = useSetParamsStore();
const logNotes = ref("");
const cancel = () => {
  closeLogSet();
}
const saveLog = async () => {
    const logEntry = {
      setId: store.setId,
      completed: Date(),
      notes: logNotes.value,
    }
  await store.logSet(logEntry);
  closeLogSet();
}
const prs = ref([]);
store.exercises.forEach(exs => {
  const pr = {
    name: exs.name,
    sequence: exs.sequence,
    pr: 0,
   }  
   prs.value.push(pr);
});
const closeLogSet = () => {
  if (store.setName == ""){
    store.editMode = "Add";
  } else {
    store.editMode = "Edit";
  }
  store.showWorkoutCompleted = false;
}
</script>
<style >
#notes {
  width: 100%;  /* Makes the textarea take up the full width of its container */
  height: 100px;  /* Sets the height of the textarea */
  padding: 10px;  /* Adds some padding inside the textarea */
  font-size: 16px;  /* Sets the font size */
  line-height: 1.5;  /* Sets the line height */
  border: 1px solid #ccc;  /* Sets a light gray border */
  border-radius: 4px;  /* Rounds the corners */
  box-sizing: border-box;  /* Ensures padding and border are included in the width and height */
  resize: vertical;  /* Allows the user to resize the textarea vertically only */
}




</style>