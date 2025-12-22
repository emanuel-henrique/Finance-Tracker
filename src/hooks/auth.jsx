import { api } from "@/services/api";
import { createContext, useContext, useState, useEffect, use } from "react";

export const authContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function login({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      setData({ user, token });

      localStorage.setItem("@financeTracker:user", JSON.stringify(user));
      localStorage.setItem("@financeTracker:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível logar.");
      }
    }
  }

  function logout() {
    localStorage.removeItem("@financeTracker:token");
    localStorage.removeItem("@financeTracker:user");

    setData({});
  }

  async function updateProfile({ user }) {
    try {
      await api.put("/users/update", user);
      localStorage.setItem("@financeTracker:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado com succeso!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi atualizar o perfil.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@financeTracker:token");
    const user = localStorage.getItem("@financeTracker:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <authContext.Provider
      value={{ login, logout, updateProfile, user: data.user }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  return context;
}

export { AuthProvider, useAuth };
