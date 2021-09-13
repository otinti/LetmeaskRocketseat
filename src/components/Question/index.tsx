import { ReactNode } from 'react'; // ReactNode é basicamente qualquer conteudo JSX (texto, div, ou seja, quaisquer componente)
import cx from 'classnames'

import './styles.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children
}: QuestionProps) {
    return (
        <div className={cx('question', { answered: isAnswered }, { highlighted: isHighlighted && !isAnswered })}>
            {/* Irá devolver caso answered for true, e tbm irá devolver highlighted caso isHighlighted for true */}
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