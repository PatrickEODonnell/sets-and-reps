<template>
  <footer>
    <!-- Navigation Links -->
    <nav>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Timer</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/workouts" class="nav-link">Workouts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sets" class="nav-link">W/O Segments</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link">About</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<style scoped>
ul {
  margin: 0px;
  height: 30px;
  padding: 5px;
}
</style>
