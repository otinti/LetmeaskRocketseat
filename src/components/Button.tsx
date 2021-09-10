import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean  // "?" indica que é opcional
};

export function Button({ isOutlined = false, ...props}: ButtonProps) { // isOutlined com valor padrão false (quando não estiver definido)
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props} 
        />
    )
}