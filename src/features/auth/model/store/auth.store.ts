import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  reset: () => set({ user: null, accessToken: null }),
  isAuthenticated: () => !!get().user,
  getUserRole: () => get().user?.role.name,
  getUserFullName: () => {
    const user = get().user;
    if (!user) return null;
    return `${user.person.firstName} ${user.person.lastName}`;
  },
}));
