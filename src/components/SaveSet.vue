<template>
  <div id="timer-input" >
    <div>
      <div id="edit-heading"><h1>Save Set</h1></div>
      <div class="row">
        <div class="column">
          <div>Set Name:</div>
          <div>
            <div><input type="text" v-model="store.setName" /></div>
          </div>
        </div>
      </div>
      <div class="row">&nbsp;</div>
      <div class="row">
        <div class="column">
          <button @click="store.showSaveSet = false" class="form-button">
            <p>Cancel</p>
          </button>
        </div>
        <div class="column">
          <button @click="saveSet" class="form-button">
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSetParamsStore } from "@/libs/siteParams";
const store = useSetParamsStore();
async function saveSet() {
  await store.add();
  store.showSaveSet = false;
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
