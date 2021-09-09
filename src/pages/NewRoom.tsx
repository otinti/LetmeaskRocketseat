import { Link, useHistory } from 'react-router-dom'; // Praticamente a mesma coisa que o useHistory usado no Home.tsx, mas com âncoras
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault(); // previne o comportamento padrão da pg

        if (newRoom.trim() === '') {  // o trim() verifica os espaços que o usuário adicionou na esquerda e direita, se obtiver espaços não será executado
            return;
        }

        const roomRef = database.ref('rooms'); // estou dizendo que lá dentro do meu banco de dados do firebase, há uma categoria chamada 'rooms'

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id // O '?', é para verificar se no user há um undefined ou um usuário já verificado
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}