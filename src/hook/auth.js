import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });

      const { user, token } = response.data;

      await AsyncStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      await AsyncStorage.setItem("@rocketnotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar!");
      }
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("@rocketnotes:user");
        const token = await AsyncStorage.getItem("@rocketnotes:token");

        if (token && user) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          setData({
            token,
            user: JSON.parse(user),
          });
        }
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };

    getUserData();
  }, []);

  function signOut() {
    AsyncStorage.removeItem("@rocketnotes:user");
    AsyncStorage.removeItem("@rocketnotes:token");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    if (avatarFile) {
      const fileUpdateForm = new FormData();

      fileUpdateForm.append("avatar", avatarFile);

      const response = await api.patch("/users/avatar", fileUpdateForm);

      user.avatar = response.data.avatar;
    }

    try {
      await api.put("/users", user);
      await AsyncStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil!");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        updateProfile,
        user: data.user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
