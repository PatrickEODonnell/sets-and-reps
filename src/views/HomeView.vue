<script setup></script>

<template>
  <header>
    <img src="../assets/menu-icon.png" />
    <p>SETS & REPS</p>
    <p class="push light-11">Easy Workout Builder</p>
  </header>
  <main>
    <!-- Exercise Section-->
    <div id="exercise">
      <h1 id="exercise-name" class="light-11">Exercise Name</h1>
      <div class="sets bold-16">
        <img src="../assets/dumbell.svg" />
        <p>Bicep Curls</p>
        <p>x8</p>
      </div>
      <div class="sets bold-16">
        <img src="../assets/dumbell.svg" />
        <p>Hammer Curls</p>
        <p>x8</p>
      </div>
    </div>

    <!-- Timer Widget-->
    <div id="timer">
      <div id="set-counter">
        <h1>Set:&nbsp;</h1>
        <h1 id="sets-complete">1</h1>
        <h1 id="sets-total">/4</h1>
      </div>

      <div>
        <p id="time">2:30</p>
      </div>

      <div id="controls">
        <button id="reset">
          <img src="../assets/reset.svg" />
          <p class="sr-only">Reset timer</p>
        </button>
        <button id="play">
          <img id="play-pause" src="../assets/play.svg" />
          <p class="sr-only">Play</p>
        </button>
      </div>

      <button id="complete" class="normal-16 ripplebutton">
        <img src="../assets/check.png" />
        Workout Completed
        <div></div>
      </button>
    </div>

    <!-- Add Note Button-->
    <div id="buttons">
      <button id="add-note" class="normal-16 ripplebutton">
        <img src="../assets/addnote.svg" />
        Add Note
      </button>
    </div>
  </main>
  <footer>(Nav Icons Here)</footer>
</template>
<style></style>
