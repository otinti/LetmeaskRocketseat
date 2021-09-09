import { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; // Dentro da promessa eu não tenho nenhum retorno (return), ou seja --> void
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
const [user, setUser] = useState<User>();

  useEffect(() => {  // o useEffect é um hook de disparo de efeitos colaterais (funcionalidades). Será utilizado quando eu quero disparar uma função que sempre que algo acontecer na tela (ex: quando algo mudou, este componete será mostrado em tela), nós conseguiremos controlar isso em tela em tempo real
    const unsubscribe = auth.onAuthStateChanged(user => { // onAuthStateChanged ficará ouvindo tudo que acontece dentro dele (não tirar a autenticação do usuário quando ele der F5)
      if (user) {
        const { displayName, photoURL, uid } = user; // busca as informações do usuário

          if (!displayName || !photoURL) {
            throw new Error('Faltando informações da conta Google.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          }) // preenche no estado
      }
    })

    return () => {
      unsubscribe(); // servirá para parar de cadastrar sempre no final do useEffect, caso não seja feito, o useEffect ficará rodando na aplicação até dar erro
    }
  }, [])

  async function signInWithGoogle() {                                   // Toda async devolve uma promessa no javascript
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

        if (result.user) {
          const { displayName, photoURL, uid } = result.user;

          if (!displayName || !photoURL) {
            throw new Error('Faltando informações da conta Google.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
  }
    /* A função sem o async e await ficará desta forma:
  
    function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider).then(result => {                              (Colocou um await ao invés de um .then)
        if (result.user) {
          const { displayName, photoURL, uid } = result.user;

          if (!displayName || !photoURL) {
            throw new Error('Faltando informações da conta Google.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
    })
  } */

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}