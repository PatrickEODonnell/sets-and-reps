<template>
  <div id="timer-input">
    <div id="edit-heading"><h1>Settings</h1></div>
    <!-- <div class="row">
      <div class="column">&nbsp;</div>
      <div class="column">&nbsp;</div>
      <div class="column"><button @click="saveSet" :disabled="isDisabled" class="sr-button">SAVE SET <IconContentSave style="vertical-align:middle;" /></button></div>
    </div> -->
    <div class="row">
      <div class="column">
        <div>Choose type of Set:</div>
        <div>
          <select v-model="store.setType" @change="changeSetType($event)">
            <option v-for="type in setTypes" :key="type.key">
              {{ type.value }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="store.setType == 'Standard' || store.setType == 'Superset'" style="width: 100%;" >
      <div class="row">
        <div class="column">
          <div>How many Sets?:</div>
          <div><input type="number" v-model="store.sets" @change="changeSets($event)" /></div>
        </div>
        <div class="column">
          <div>Minutes per Set?</div>
          <div>
            <input type="number" v-model="store.minPerSet" @change="changeMinPerSet($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercises (optional):</div>
          <div><input type="text" v-model="newExercise" /><button @click="addExercise($event)" class="sr-button"><IconPlus /></button></div>
        </div>
      </div>
      <div class="row" style="display: flex; justify-content: space-between; align-items: center;">
        <div >
          Total time: {{ store.sets * store.minPerSet }} min. 
        </div>
          <div class="sr-button" >Sound<input type="checkbox"  v-model="store.soundEnabled" /></div>
        <div class="sr-button" >Count Down<input type="checkbox"  v-model="store.countdownEnabled"/></div>
        <EditButton :add-is-disabled="store.addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
      </div>
    </div>

    <div v-if="store.setType == 'EMOM'" style="width: 100%;">
      <div class="row">
        <div class="column">
          <div>How many Sets?:</div>
          <div><input type="number" v-model="store.sets" @change="changeSets($event)" /></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercises:</div>
          <div><input type="text" v-model="newExercise" /><button @click="addExercise($event)" class="sr-button"><IconPlus/></button></div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div  >
          Total time: {{ store.sets * store.exercises.length }} min. 
        </div>
        <div class="sr-button" >Sound<input type="checkbox"  v-model="store.soundEnabled" /></div>
        <div class="sr-button" >Count Down<input type="checkbox"  v-model="store.countdownEnabled"/></div>
        <EditButton :add-is-disabled="store.addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
      </div>

    </div>

    <div v-if="store.setType == 'AMRAP'" style="width: 100%;">
      <div class="row">
        <div class="column">
          <div>How many Minutes?:</div>
          <div>
            <input type="number" v-model="store.minPerSet" @change="changeMinPerSet($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercise(s):</div>
          <div><input type="text" v-model="newExercise" /><button @click="addExercise($event)" class="sr-button"><IconPlus /></button></div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div  >
          Total time: {{ store.minPerSet }} min. 
        </div>
        <div class="sr-button" >Sound<input type="checkbox"  v-model="store.soundEnabled" /></div>
        <div class="sr-button" >Count Down<input type="checkbox"  v-model="store.countdownEnabled"/></div>
        <EditButton :add-is-disabled="store.addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
      </div>
    </div>
    <div v-if="store.setType == 'Tabata'" style="width: 100%;">
      <div class="row">
        <div class="column">
          <div>How many Rounds?:</div>
          <div><input type="number" v-model="store.sets" @change="changeSets($event)" /></div>
        </div>
        <div class="column">
          <div>Seconds On?</div>
          <div>
            <input type="number" v-model="store.secondsOn" @change="changeSecondsOn($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Seconds Off?</div>
          <div>
            <input type="number" v-model="store.secondsOff" @change="changeSecondsOff($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercises:</div>
          <div><input type="text" v-model="newExercise" /><button @click="addExercise($event)" class="sr-button"><IconPlus style="font-size:large;vertical-align: middle;"/></button></div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div  >
          Time: {{ (store.sets * (secondsOn + secondsOff))/60 }} min. 
        </div>
        <div class="sr-button" >Sound<input type="checkbox"  v-model="store.soundEnabled" /></div>
        <div class="sr-button" >Count Down<input type="checkbox"  v-model="store.countdownEnabled"/></div>

        <EditButton :add-is-disabled="store.addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" :sound-enabled="true" @add="addNew" @undo="undo" @save="save" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import IconPlus from '~icons/mdi/plus';
const props = defineProps(["editMode"]);
import EditButton from "./EditButton.vue";
const { editMode } = props;
const addIsDisabled = ref(false);
const store = useSetParamsStore();

let newExercise = ref("");
const setTypes = ref([
  { key: "Standard", value: "Standard" },
  { key: "Superset", value: "Superset" },
  { key: "EMOM", value: "EMOM" },
  { key: "AMRAP", value: "AMRAP" },
  { key: "Tabata", value: "Tabata" }
]);
let secondsOn = ref(20);
let secondsOff = ref(10);
let soundEnabled = ref(true);
let countdownEnabled = ref(true);

function changeMinPerSet(event) {
  if(event.target.value < 0){
    store.updateMinPerSet(0);
  }
  else{
    store.updateMinPerSet(event.target.value);
  }

  console.log("undoDisabled", store.undoDisabled);
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function changeSets(event) {
  if (event.target.value < 0){
    store.updateSets(0);  
  }
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
  else{
    store.updateSets(event.target.value);
  }
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function changeSetType(event) {
  store.updateSetType(event.target.value);
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function startTimer(event) {
  store.startStandardTimer();
  store.undoDisabled = true;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function addExercise(event) {
  store.addExercise(newExercise.value);
  newExercise.value = "";
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function changeSecondsOn(event) {
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function changeSecondsOff(event) {
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    store.addIsDisabled = true;
}
function changeSoundEnabled(){
  console.log("ChangeSoundEnabled", soundEnabled.value);
  store.updateSoundEnabled(soundEnabled.value);
}
function changeCountDownEnabled(event){
  console.log(countdownEnabled.value);
  
}
function undo(){
  store.addIsDisabled = false;
  store.undoChanges();
  store.undoDisabled = true;
}
async function save() {
  console.log("Save function:");
  if (store.editMode == "Edit") {
    console.log("saveSet");
    await store.save();
    store.saveOriginalSet();
  } else {
    store.editMode = "Save";
  }
  store.undoDisabled = true;
  store.addIsDisabled = false;
  console.log("saveSet completed");
}
function addNew(){
  store.initSet();
  store.clearExercises();
  store.editMode = "Add";
}
</script>

<style>
#timer-input {
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
</style>
