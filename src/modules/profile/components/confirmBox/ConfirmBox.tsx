import React, {FC} from 'react';
import styles from './ConfirmBox.module.css';
import Button from '@/UI/button/Button';
import Modal from '@/UI/modal/Modal';

interface IConfirmProps {
    status?: 'danger' | 'warning' | 'success';
    text: string;
    buttonText: string;
    function: () => void;
}

const ConfirmBox: FC<IConfirmProps> = props => {
    return (
        <div className={styles.ConfirmBox}>
            <span className={styles.Text}>
                {props.text}
            </span>
            <Button
                className={styles[props.status ?? 'success']}
                size='lg'
                onClick={props.function}
            >
                {props.buttonText}
            </Button>
        </div>
    );
};

export default ConfirmBox;