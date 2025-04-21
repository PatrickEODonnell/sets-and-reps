<template>
  <div id="timer-input">
    <div id="edit-heading"><h1>Settings</h1></div>
    <div class="row">
      <div class="column" style="padding-right: 10px">
        <div>Timing:</div>
        <div>
          <select v-model="store.setType" @change="changeSetType($event)">
            <option v-for="type in SET_TIMING" :key="type.key">
              {{ type.value }}
            </option>
          </select>
        </div>
      </div>
      <div class="column" style="padding-right: 10px">
        <div>Segment</div>
        <div>
          <select v-model="store.sectionType">
            <option v-for="section in SET_SECTIONS" :key="section.key">
              {{ section.value }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <div>Movement</div>
        <div>
          <select v-model="store.movementType">
            <option v-for="movement in MOVEMENTS" :key="movement.key">
              {{ movement.value }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="store.setType == 'Standard' || store.setType == 'Superset'" style="width: 100%">
      <SetsAndMinutes :show-sets="true" :show-minutes="true" />
      <AddExToSet @save="saveExercise" />
      <SoundAndCountdown />
      <div class="row" style="display: flex; margin-top: 10px">
        <MinPerSet />
        <EditButton
          :add-is-disabled="store.addIsDisabled"
          :edit-mode="store.editMode"
          :undo-is-disabled="store.undoDisabled"
          @add="addNew"
          @undo="undo"
          @save="save"
        />
      </div>
    </div>

    <div v-if="store.setType == 'EMOM'" style="width: 100%">
      <SetsAndMinutes :show-minutes="false" :show-sets="true" />
      <AddExToSet @save="saveExercise" />
      <SoundAndCountdown />
      <div class="row">
        <div>Total time: {{ store.sets * store.exercises.length }} min.</div>
        <EditButton
          :add-is-disabled="store.addIsDisabled"
          :edit-mode="store.editMode"
          :undo-is-disabled="store.undoDisabled"
          @add="addNew"
          @undo="undo"
          @save="save"
        />
      </div>
    </div>

    <div v-if="store.setType == 'AMRAP'" style="width: 100%">
      <SetsAndMinutes :show-minutes="true" :show-sets="false" />
      <AddExToSet @save="saveExercise" />
      <SoundAndCountdown />
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>Total time: {{ store.minPerSet }} min.</div>
        <EditButton
          :add-is-disabled="store.addIsDisabled"
          :edit-mode="store.editMode"
          :undo-is-disabled="store.undoDisabled"
          @add="addNew"
          @undo="undo"
          @save="save"
        />
      </div>
    </div>
    <div v-if="store.setType == 'Tabata'" style="width: 100%">
      <div class="row">
        <div class="column">
          <div>Rounds:</div>
          <div>
            <input
              type="number"
              v-model="store.sets"
              @change="changeSets($event)"
              style="width: 70px"
            />
          </div>
        </div>
        <div class="column">
          <div>Seconds On</div>
          <div>
            <input
              type="number"
              v-model="store.secondsOn"
              @change="changeSecondsOn($event)"
              style="width: 70px"
            />
          </div>
        </div>
        <div class="column">
          <div>Seconds Off</div>
          <div>
            <input
              type="number"
              v-model="store.secondsOff"
              @change="changeSecondsOff($event)"
              style="width: 70px"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Seconds Off?</div>
          <div>
            <input
              type="number"
              v-model="store.secondsOff"
              @change="changeSecondsOff($event)"
              style="width: 70px"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <AddExToSet />
        </div>
      </div>
      <div class="row">
        <div class="columns">
          <SoundAndCountdown />
        </div>
      </div>
      <div class="row">
        <div style="display: flex">
          Time: {{ (store.sets * (secondsOn + secondsOff)) / 60 }} min.
          <EditButton
            :add-is-disabled="store.addIsDisabled"
            :edit-mode="store.editMode"
            :undo-is-disabled="store.undoDisabled"
            :sound-enabled="true"
            @add="addNew"
            @undo="undo"
            @save="save"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useSetParamsStore } from "@/libs/siteParams";
import IconPlus from "~icons/mdi/plus";
const props = defineProps(["editMode"]);
import EditButton from "./EditButton.vue";
import AddExToSet from "./AddExToSet.vue";
import SoundAndCountdown from "./SoundAndCountdown.vue";
import SetsAndMinutes from "./SetsAndMinutes.vue";
import MinPerSet from "./MinPerSet.vue";
import { SET_SECTIONS, MOVEMENTS, SET_TIMING } from "@/libs/common";

const { editMode } = props;
const addIsDisabled = ref(false);
const store = useSetParamsStore();

let newExercise = ref("");
let secondsOn = ref(20);
let secondsOff = ref(10);
let soundEnabled = ref(true);
let countdownEnabled = ref(true);
function saveExercise(exercise) {
  store.addExercise(exercise);
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function changeMinPerSet(event) {
  if (event.target.value < 0) {
    store.updateMinPerSet(0);
  } else {
    store.updateMinPerSet(event.target.value);
  }

  console.log("undoDisabled", store.undoDisabled);
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function changeSets(event) {
  if (event.target.value < 0) {
    store.updateSets(0);
  }
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
  else {
    store.updateSets(event.target.value);
  }
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function changeSetType(event) {
  store.updateSetType(event.target.value);
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function startTimer(event) {
  store.startStandardTimer();
  store.undoDisabled = true;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function addExercise(event) {
  store.addExercise(newExercise.value);
  newExercise.value = "";
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function changeSecondsOn(event) {
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function changeSecondsOff(event) {
  store.undoDisabled = false;
  if (store.editMode == "Edit") store.addIsDisabled = true;
}
function changeSoundEnabled() {
  console.log("ChangeSoundEnabled", soundEnabled.value);
  store.updateSoundEnabled(soundEnabled.value);
}
function changeCountDownEnabled(event) {
  console.log(countdownEnabled.value);
}
function undo() {
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
function addNew() {
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
