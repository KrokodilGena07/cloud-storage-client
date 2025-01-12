import React, {FC} from 'react';
import styles from './Modal.module.css';

interface IModalProps {
    children: React.ReactNode;
    isVisible: boolean;
    setIsVisible: (visibleFlag: boolean) => void;
    className?: string;
    classNameToWindow?: string;
}

const Modal: FC<IModalProps> = props => {
    if (!props.isVisible) return null;

    return (
        <div
            className={`${styles.Modal} ${props.className}`}
            onClick={() => props.setIsVisible(false)}
        >
            <div
                className={`${styles.ModalContent} ${props.classNameToWindow}`}
                onClick={e => e.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;