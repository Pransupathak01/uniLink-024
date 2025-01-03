import { create } from 'zustand';
interface UserState {
    id: string;
    name: string;
    email: string;
}
interface StoreType {
    userData: UserState | null;
    setUserData: (userData: UserState) => void;
    deleteUserData: () => void;
}


const useStore = create<StoreType>((set) => ({
    userData: null,
    setUserData: (userData) => set({ userData }),
    deleteUserData: () => set({ userData: null }),
  }));

export default useStore;
