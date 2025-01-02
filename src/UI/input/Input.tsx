import React, {FC, useState} from 'react';
import styles from './Input.module.css';
import {UISize} from '@/models';
import EyeIcon from '@/assets/eyeIcon.svg';
import ClosedEyeIcon from '@/assets/closedEyeIcon.svg';

interface IInputProps {
    value?: string;
    onChange: (v: any) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    required?: boolean;
    max?: number;
    size?: UISize;
    isInvalid?: boolean;
    error?: string;
}

const Input: FC<IInputProps> = props => {
    const size = props.size ? styles[props.size] : styles.md;
    const error = props.isInvalid ? styles.ErrorInput : '';

    const sameClasses = `${styles.Input} ${props.className} ${error}`;
    const defaultClasses = `${sameClasses} ${styles.InputText} ${size}`;

    const [passwordFlag, setPasswordFlag] = useState(false);
    const passwordHandler = () => setPasswordFlag(!passwordFlag);

    if (props.type === 'file') {
        return (
            <>
                <label
                    htmlFor='File'
                    className={`${defaultClasses} ${styles.FileInput}`}
                >
                    {props.value ?? 'Select image'}

                </label>
                <input
                    type='file'
                    id='File'
                    className={styles.InputNone}
                    onChange={e => props.onChange(e.target.files[0])}
                />
            </>
        );
    }

    if (props.type === 'password') {
        return (
            <>
                <div className={`${sameClasses} ${styles.PasswordInputParent}`}>
                    <input
                        type={passwordFlag ? 'text' : 'password'}
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                        className={`${styles.InputText} ${size} ${styles.PasswordInput}`}
                        placeholder={props.placeholder}
                        required={props.required}
                        max={props.max}
                    />
                    <button
                        className={styles.PasswordInputButton}
                        type='button'
                        onClick={passwordHandler}
                    >
                        {passwordFlag ?
                            <ClosedEyeIcon className={styles.PasswordInputIcon}/>

                            :
                            <EyeIcon className={styles.PasswordInputIcon}/>
                        }
                    </button>
                </div>
                {props.error &&
                    <span className={styles.Error}>{props.error}</span>
                }
            </>
        );
    }

    return (
        <>
            <input
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                type={props.type || 'text'}
                className={defaultClasses}
                placeholder={props.placeholder}
                required={props.required}
                max={props.max}
            />
            {props.error &&
                <span className={styles.Error}>{props.error}</span>
            }
        </>
    );
};

export default Input;