import React, {FC} from 'react';
import styles from './Warning.module.css';
import Close from '@/assets/svg/close.svg';

interface IWarningProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const Warning: FC<IWarningProps> = ({isVisible, setIsVisible}) => {
    if (isVisible) return null;

    return (
        <div className={styles.Warning}>
            <span className={styles.Text}>
                Please, activate your account to use some functions of storage!
            </span>
            <button
                className={styles.Button}
                onClick={() => setIsVisible(true)}
            >
                <Close className={styles.Icon}/>
            </button>
        </div>
    );
};

export default Warning;