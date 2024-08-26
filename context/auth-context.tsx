import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import axios, { AxiosInstance } from "axios"
import { getItemAsync, setItemAsync } from "expo-secure-store"
import { jwtDecode } from "jwt-decode"

interface AuthContextType {
  authState: {
    accessToken: string | null
    refreshToken: string | null
    authenticated: boolean | null
  } | null
  setAuthState: Dispatch<
    SetStateAction<{
      accessToken: string | null
      refreshToken: string | null
      authenticated: boolean | null
    } | null>
  >
  axiosJWT: AxiosInstance
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) throw new Error("useAuth must be used within an AuthProvider")

  return context
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [authState, setAuthState] = useState<{
    accessToken: string | null
    refreshToken: string | null
    authenticated: boolean | null
  } | null>(null)

  useEffect(() => {
    const loadAuthState = async () => {
      const accessToken = await getItemAsync("access_token")
      const refreshToken = await getItemAsync("refresh_token")

      if (accessToken && refreshToken) {
        setAuthState({ accessToken, refreshToken, authenticated: true })
      } else {
        setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false
        })
      }
    }

    loadAuthState()
  }, [])

  const getRefreshToken = async () => {
    try {
      const refreshToken = await getItemAsync("refresh_token")

      if (!refreshToken) return { error: true, message: "Not Authenticated" }

      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`,
        { refreshToken }
      )

      await setItemAsync("access_token", result.data.accessToken)
      await setItemAsync("refresh_token", result.data.newRefreshToken)

      setAuthState({
        accessToken: result.data.accessToken,
        refreshToken: result.data.newRefreshToken,
        authenticated: true
      })

      return result.data
    } catch (error) {
      console.log(error)
      return { error: true, message: (error as any).response.data }
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      const date = new Date()
      const decodedToken = jwtDecode(authState?.accessToken!)

      if (decodedToken.exp! * 1000 < date.getTime()) {
        const data = await getRefreshToken()

        config.headers["Authorization"] = "Bearer " + data.accessToken
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  return (
    <AuthContext.Provider
      {...props}
      value={{ authState, setAuthState, axiosJWT }}
    />
  )
}

export { AuthProvider, useAuth }
