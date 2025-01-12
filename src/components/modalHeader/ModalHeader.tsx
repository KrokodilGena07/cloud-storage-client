import React, {FC} from 'react';
import styles from './ModalHeader.module.css';
import Close from '@/assets/svg/close.svg';

interface IModalHeaderProps {
    text: string;
    setFlag: (flag: boolean) => void;
}

const ModalHeader: FC<IModalHeaderProps> = ({text, setFlag}) => {
    return (
        <div className={styles.Header}>
            <span className={styles.Text}>{text}</span>
            <button
                className={styles.Button}
                onClick={() => setFlag(false)}
                type='button'
            >
                <Close className={styles.Icon}/>
            </button>
        </div>
    );
};

export default ModalHeader;