import {create} from 'zustand'

// Define a type to describe the shape of the state
type Preferences = {
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
  }

// Create the Zustand store with the initial state and actions
export const usePreferences = create<Preferences>((set) => ({
    // Initial state: soundEnabled is set to true
    soundEnabled: true,
    
  setSoundEnabled:(soundEnabled:boolean) => set({soundEnabled}),

}));