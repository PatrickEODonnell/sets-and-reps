<template>
  <div class="set-row">
    
  <div style="display: flex; justify-content: space-between; align-items: center;">
  <div>
    <button @click.stop="expand(set.id)" class="sr-button">
      <IconPlus v-if="expandedId != set.id" style="vertical-align: middle;font-size: 24px;" />
      <IconMinus v-if="expandedId == set.id" style="vertical-align: middle;font-size: 24px;" />
    </button>
    <span style="vertical-align: middle;font-size: large;">{{ set.name }}</span>
  </div>
  <button @click.stop="deleteSet" class="sr-button">
    <IconTrashCan style="vertical-align: middle;font-size: 24px;" />
</button>
</div>
      <div  class="set-details">
        <strong>{{ set.setType }} - {{ set.section }} - {{ set.movement }} </strong>

      </div>
      <div class="set-details">
        {{ set.minPerSet }} mins/set for {{ set.numOfSets }} sets
      </div>
      <div v-if="expandedId == set.id" class="set-details">
        <strong>Exercises:</strong>
        <span v-for="(ex, sequence) in set.exercises" :key="sequence">
          <br />{{ ex.reps }} x {{ ex.name }}
        </span>
      </div>
    
  </div>
</template>
<script setup>
import { ref } from 'vue';
import IconTrashCan from '~icons/mdi/trash-can';
import IconPlus from '~icons/mdi/plus';
import IconMinus from '~icons/mdi/minus';

const props = defineProps({
    set: {required: true}
});
const emit = defineEmits(['delete'])
const deleteSet = () => { 
    emit('delete', props.set.id);
};
const expandedId = ref(0);

function expand(id) {
  if (expandedId.value == id) {
    expandedId.value = 0;
  } else {
    expandedId.value = id;
  }
}

</script>
<style scoped>
#sets-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
  position: relative;
  /* border-radius: 20px;
  border: 1px solid black; */
  margin: 25px;
}
.set-row {
  border: 1px solid darkgray;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  padding: 10px;
  text-align: left;
}
.sr-button {
  /* width: 100px;
  height: 35px; */
  align-self: center;
  overflow: hidden;

  border-radius: 25px;
  border: none;
}
.set-details {
  padding: 6px 3px 3px 10px;
  font-size: smaller;
}
</style>
