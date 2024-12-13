import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useMainStore = defineStore('main', {
  state: () => ({
    categories: useStorage('categories', []),
    subcategories: useStorage('subcategories', []),
    auras: useStorage('auras', []),
    gameVersions: useStorage('gameVersions', []),
  }),
  actions: {
    setCategories(categories) {
      this.categories = categories;
    },
    setSubcategories(subcategories) {
      this.subcategories = subcategories;
    },
    setAuras(auras) {
      this.auras = auras;
    },
    setGameVersions(gameVersions) {
      this.gameVersions = gameVersions;
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    getSubcategories: (state) => state.subcategories,
    getAuras: (state) => state.auras,
    getGameVersions: (state) => state.gameVersions,
  },
});


