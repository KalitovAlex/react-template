export const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  LOGIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  REFRESH: "/auth/refresh",
  GET_SELF: "/user/self",
};

export interface AutocompleteOption {
  label: string;
  value: string;
}
