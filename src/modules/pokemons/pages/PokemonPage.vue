<template>
  <section class="flex flex-col">
    <h1 class="text-3xl font-bold">
      Pokémon <small class="text-blue-500">#{{ id }}</small>
    </h1>
    <img
      class="w-[200px] h-[200px] mt-5"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
      alt="Pokémon"
      width="200"
      height="200"
    />

    <div class="flex items-center gap-4 mt-5">
      <RouterLink v-if="id > 1" class="btn-link" :to="{ name: 'pokemon', params: { id: id - 1 } }">
        Anterior
      </RouterLink>
      <button v-else class="btn-link disabled" disabled>Anterior</button>
      <RouterLink class="btn-link" :to="{ name: 'pokemon', params: { id: id + 1 } }">
        Siguiente
      </RouterLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  id: number;
}

defineProps<Props>();
</script>

<style scoped>
.btn-link {
  @apply bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400;

  &.disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>
