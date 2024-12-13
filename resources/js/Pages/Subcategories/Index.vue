<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { defineProps } from 'vue';
import { ref } from 'vue';


const props = defineProps({
  subcategory: Object,
  auras: Array,
});

const isHovered = ref(false);

function adjustColor(color) {
  return color + 'CC';
}
</script>


<template>
  <AppLayout>

    <Head title="Subcategory" />
    <div class="w-full min-h-screen">
      <div class="container flex flex-col items-center justify-center max-w-6xl px-4 py-16 mx-auto ">
        <div v-for="aura in props.auras" :key="aura.id" class="transition-all scale-95 hover:scale-100">
          <div
            class="w-full max-w-5xl border rounded-lg shadow min-h-80 hero border-neutral-900 isolate bg-black/50 ring-1 ring-black/5 sm:rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-20 ">
            <ul class="flex hero-content">
              <li class="flex gap-x-6">
                <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  class="hidden rounded-lg shadow-2xl glass sm:block" />
                <div class="h-full mt-4">
                  <h1 class="mb-4 text-5xl font-bold text-neutral-200" :style="{ color: subcategory.color }">{{
                    aura.name }}</h1>
                  <div>
                    <span class="text-lg font-semibold text-neutral-300">{{ aura.description }}:</span>
                    <p class="py-2 text-neutral-500">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. At consequatur corrupti facere
                      quibusdam,
                      rem
                      totam. Optio ipsam voluptas voluptate sint delectus, iusto adipisci reprehenderit nam obcaecati
                      numquam
                      minima fugit aspernatur.
                    </p>
                  </div>
                  <div class="w-full mt-10 text-end">
                    <button class="px-8 text-white transition-all duration-300 btn"
                      :style="{ backgroundColor: isHovered ? adjustColor(subcategory.color) : subcategory.color }"
                      @mouseover="isHovered = true" @mouseleave="isHovered = false">
                      Ver
                    </button>
                  </div>
                </div>
                <p></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
