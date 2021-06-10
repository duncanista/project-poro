import create from 'zustand';

const useStore = create((set) => ({
  health: 100,
  setHealth: (health) => set((_) => ({ health: health }))
}));

export default useStore;