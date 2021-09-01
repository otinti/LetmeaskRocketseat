import { useHistory } from 'react-router-dom'; // Estrutura de navegação (Em âncoras não precisa ser usado)

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() { // Autenticação com o firebase
        if (!user) {
            await signInWithGoogle()
        }
        
        history.push('/rooms/new');  // A direção deste path='/rooms/new' está no App.tsx
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}