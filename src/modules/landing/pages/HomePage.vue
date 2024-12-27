<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">{{ title }}</h1>
    <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl">Bienvenido a nuestro sitio web</p>
    <p>Counter: {{ counter }}</p>
    <button class="btn" @click="counter++">Increment</button>
  </div>
</template>

<script lang="ts" src="./HomePage.ts" />
