import { Link } from 'react-router-dom'; // Praticamente a mesma coisa que o useHistory usado no Home.tsx, mas com âncoras

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
    // const { user } = useAuth();

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
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