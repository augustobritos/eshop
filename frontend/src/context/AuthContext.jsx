import { createContext, useContext, useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "../api/axios";
import {
  signUpRequest,
  signInRequest,
  signOutRequest,
  updateProfileRequest,
  getEnabledPaymentsRequest,
  updateEnabledPaymentsRequest,
} from "../api/admin.api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  } else {
    throw new Error("useAuth must be used within an AuthProvider");
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (data) => {
    try {
      const res = await signUpRequest(data);
      setUser(res);
      setIsAuth(true);
      return res;
    } catch (error) {
      console.error(error.message);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }
  };

  const signIn = async (data) => {
    try {
      const res = await signInRequest(data);
      setUser(res);
      setIsAuth(true);
      return res;
    } catch (error) {
      console.error(error.message);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signOut = async () => {
    try {
      const res = await signOutRequest();
      if (res.status === 200) {
        setUser(null);
        setIsAuth(false);
        return res.data;
      }
    } catch (error) {
      console.error(error.message);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const updateProfile = async (data) => {
    try {
      const res = await updateProfileRequest(data);
      return res;
    } catch (error) {
      console.error(error.message);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }
  };

  const getEnabledPayments = async () => {
    try {
      const res = await getEnabledPaymentsRequest();
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateEnabledPayments = async (payments) => {
    try {
      const res = await updateEnabledPaymentsRequest(payments);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    setLoading(true);
    if (cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
          setLoading(false);
        })
        .catch((error) => {
          setUser(null);
          setIsAuth(false);
          setLoading(false);
          console.error(error);
        });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors(null);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signUp,
        setUser,
        signIn,
        updateProfile,
        getEnabledPayments,
        updateEnabledPayments,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
