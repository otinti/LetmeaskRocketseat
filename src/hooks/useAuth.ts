import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Recuperar o valor de um contexto

export function useAuth() {
    const value = useContext(AuthContext)

    return value;
}