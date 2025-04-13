<template>
<div>
    <div class="row" style="display: flex;   align-items: center; ">
          <div class="sr-button" style="margin-right: 10px;" >Sound<input type="checkbox"  v-model="store.soundEnabled" /></div>
        <div class="sr-button" >Count Down<input type="checkbox"  v-model="store.countdownEnabled"/></div>
        <!-- <EditButton :add-is-disabled="store.addIsDisabled" :edit-mode="store.editMode" :undo-is-disabled="store.undoDisabled" @add="addNew" @undo="undo" @save="save" /> -->
      </div>
</div>
</template>
<script setup>
import { useSetParamsStore } from '@/libs/siteParams';
const store = useSetParamsStore();
</script>