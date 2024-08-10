// Importing the create function from the 'zustand' library to create a store
import { create } from "zustand";

// Importing the User type from your database file
import { User } from '@/db/dummy'

// Defining the type for the store's state
type SelectedUserState = {
    selectedUser: User | null; // The selectedUser can either be a User object or null
    setSelectedUser: (user: User | null) => void; // Function to update the selectedUser state
}

// Creating the zustand store
// export const useSelectedUser = create<SelectedUserState>((set) => ({
//     // Initial state: selectedUser is set to null, meaning no user is selected initially
//     selectedUser: null,

//     // Function to update the selectedUser state; it takes a User object or null as an argument
//     setSelectedUser: (user: User | null) => set({ selectedUser: user }),
// }));


export const useSelectedUser = create<SelectedUserState>((set) => ({
	selectedUser: null,
	setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}));
