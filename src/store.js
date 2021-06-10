import create from 'zustand';

const userStore = (set) => ({
  health: 100,
  reduceHealth: (value) => set((state) => ({ health: state.health - value })),
  loot: 0,
  increaseLoot: (value) => set((state) => ({ loot: state.loot + value })),
  potions: 0,
  increasePotions: (value) => set((state) => ({ potions: state.potions + value })),
  api: null
});

const gameStore = (set, get) => ({
  newGame: false,
  setNewGame: () => set((state) => ({ newGame: !state.newGame })),
  refs: {
    pauseScreen: null,
    controls: null
  },
  actions: {
    resumeGame() {
      const { refs } = get()
      if (!refs.controls || !refs.pauseScreen) {
        return;
      }
      refs.pauseScreen.hidden = true;
      refs.controls.lock();
    }
  }
});

export const useUserStore = create(userStore);
export const useGameStore = create(gameStore);