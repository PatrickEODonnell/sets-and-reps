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

    <div v-if="store.setType == 'Standard' || store.setType == 'Superset'">
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
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div  >
          Total time: {{ store.sets * store.minPerSet }} min. 
        </div>
        <EditButton :add-is-disabled="addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
      </div>
    </div>

    <div v-if="store.setType == 'EMOM'">
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
        <!-- <div><button @click="saveSet" :disabled="isDisabled" class="sr-button"><IconContentSave style="vertical-align: middle;font-size: 24px;" /></button></div>       -->
        <EditButton :add-is-disabled="addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
      </div>

    </div>

    <div v-if="store.setType == 'AMRAP'">
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
        <EditButton :add-is-disabled="addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
      </div>
    </div>
    <div v-if="store.setType == 'Tabata'">
      <div class="row">
        <div class="column">
          <div>How many Rounds?:</div>
          <div><input type="number" v-model="store.sets" @change="changeSets($event)" /></div>
        </div>
        <div class="column">
          <div>Seconds On?</div>
          <div>
            <input type="number" v-model="secondsOn" @change="changeSecondsOn($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Seconds Off?</div>
          <div>
            <input type="number" v-model="secondsOff" @change="changeSecondsOff($event)" />
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
          Total time: {{ (store.sets * (secondsOn + secondsOff))/60 }} min. 
        </div>
        <EditButton :add-is-disabled="addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" />
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

function changeMinPerSet(event) {
  console.log("undoDisabled", store.undoDisabled);
  store.updateMinPerSet(event.target.value);
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function changeSets(event) {
  store.updateSets(event.target.value);
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function changeSetType(event) {
  store.updateSetType(event.target.value);
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function startTimer(event) {
  store.startStandardTimer();
  store.undoDisabled = true;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function addExercise(event) {
  store.addExercise(newExercise.value);
  newExercise.value = "";
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function changeSecondsOn(event) {
  store.secondsOn = event.target.value;
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function changeSecondsOff(event) {
  store.secondsOff = event.target.value;
  store.undoDisabled = false;
  if (store.editMode == "Edit")
    addIsDisabled.value = true;
}
function undo(){
  addIsDisabled.value = false;
  store.undoChanges();
  store.undoDisabled = true;
}
async function save() {
  if (store.editMode == "Edit") {
    console.log("saveSet");
    await store.save();
    store.saveOriginalSet();
  } else {
    store.editMode = "Save";
  }
  store.undoDisabled = true;
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
