<template>
    <div class="row">
    <div class="column" v-if="showSets">
        <div>How many Sets?:</div>
        <div><input type="number" v-model="store.sets" style="width: 100px;" /></div>
    </div>
    <div class="column" v-if="showMinutes">
        <div>Minutes per Set?</div>
        <div>
        <input type="number" v-model="store.minPerSet" @change="changeMinPerSet($event)" style="width: 100px;" />
        </div>
    </div>
    </div>
</template>
<script setup>
import { useSetParamsStore } from '@/libs/siteParams';
const store = useSetParamsStore();
const props = defineProps(["showSets", "showMinutes"]);

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

</script>