import React, {FC} from 'react';
import styles from './Button.module.css';
import {UISize} from '@/models';

interface IButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'default' | 'icon';
    size?: UISize;
    className?: string;
}

const Button: FC<IButtonProps> = props => {
    const size = props.size ? styles[props.size] : styles.md;
    const variant = props.variant ? styles[props.variant] : styles.default;
    const classes = `${styles.Button} ${size} ${variant} ${props.className}`;

    return (
        <button
            onClick={props.onClick}
            className={classes}
        >
            {props.children}
        </button>
    );
};

export default Button;