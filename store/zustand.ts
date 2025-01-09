import { create } from 'zustand';
interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
}
interface StoreType {
    userEmail: string | null;
    setUserEmail: (userEmail: string|null) => void;
    userData: UserState | null;
    setUserData: (userData: UserState | null) => void;
    deleteUserData: () => void;
}

const useStore = create<StoreType>((set) => ({
    userEmail: null,
    setUserEmail: (userEmail: string|null) => (userEmail),
    userData: null,
    setUserData: (userData) => set({ userData }),
    deleteUserData: () => set({ userData: null }),
}));

export default useStore;
