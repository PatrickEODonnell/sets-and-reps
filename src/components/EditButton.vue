<template>
    <div style="display: flex;">
        <div><button @click="addNew" :disabled="addIsDisabled" class="sr-button"><IconCardPlus style="vertical-align: middle;font-size: 24px;" /></button></div>      
        <div v-if="editMode=='Edit'"><button @click="undo" :disabled="undoIsDisabled" class="sr-button"><IconUndo style="vertical-align: middle;font-size: 24px;" /></button></div>      
        <div><button @click="saveSet" class="sr-button"><IconContentSave style="vertical-align: middle;font-size: 24px;" /></button></div>      
    </div>
</template>
<script setup>
import { toRefs } from 'vue';
import IconCardPlus from '~icons/mdi/card-plus';
import IconUndo from '~icons/mdi/undo';
import IconContentSave from '~icons/mdi/content-save';

const props = defineProps(["addIsDisabled", "undoIsDisabled","editMode"]);
const { addIsDisabled, undoIsDisabled, editMode,soundEnabled, countDownEnabled} = toRefs(props);
const emit = defineEmits(['save','undo','add'])
const saveSet = () => { 
    emit('save');
};
const addNew = () =>{
    emit('add');
}
const undo = () => {
    emit('undo');
}
</script>