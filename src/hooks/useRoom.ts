import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]); // Digo no <Question[]>, que eu armazeno uma array da tipagem question
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => { // once ouve o evento apenas uma única vez // on ouve mais de uma
            const databaseRoom = room.val();
            const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions  ?? {} // ou const FirebaseQuestions = databaseRoom.questions as FirebaseQuestions; // se o objeto estiver vazio, irá utilizar um objeto vazio no lugar

            const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0], // O .some vai percorrer o array até encontrar um condição que o sastifaça o que eu passar a ele, encontrando ele vai retornar true ou false \\ o .find retorna se eu encontrei ou não
                } //                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^vai me retornar a chave (key) e o valor (like) caso ele tenha encontrado
            });
            
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })

        return () => {
            roomRef.off('value'); // remove todos os event listeners
        }
    }, [roomId, user?.id]);

    return { questions, title }
}