import { ReactNode } from 'react'; // ReactNode é basicamente qualquer conteudo JSX (texto, div, ou seja, quaisquer componente)

import './styles.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
}

export function Question({
    content,
    author,
    children
}: QuestionProps) {
    return (
        <div className="question">
            <p>{content}</p> 
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}