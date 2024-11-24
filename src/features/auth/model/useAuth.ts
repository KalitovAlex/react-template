import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
  });

  return { login, isLoading };
}; 