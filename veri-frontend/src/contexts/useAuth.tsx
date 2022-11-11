import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as authService from '../api/services/authService';
import * as userService from '../api/services/userService';
import { User, Login, SignUp, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const response = await userService.getUser();
        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (_err) {
        console.log(_err);
      } finally {
        setLoadingInitial(false);
      }
    })();
  }, []);

  async function login(loginData: Login) {
    setLoading(true);
    try {
      const response = await authService.login(loginData);
      setUser(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function signUp(signUpData: SignUp) {
    setLoading(true);
    try {
      await authService.signUp(signUpData);
      const user = await userService.getUser();
      setUser(user.data.data);
      navigate('/admin');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await authService.logout();
      setUser(undefined);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
