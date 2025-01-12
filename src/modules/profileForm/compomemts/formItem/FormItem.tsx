import React, {FC} from 'react';
import styles from './FormItem.module.css';
import Input from '@/UI/input/Input';
import {IUserInput} from '@/modules/profileForm/models';

interface IFormItemProps {
    id: string;
    text: string;
    type?: React.HTMLInputTypeAttribute;
    value: string;
    userData: IUserInput;
    onChange: (v: IUserInput) => void;
    className?: string;
    required?: boolean;
    max?: number;
    isInvalid?: boolean;
    error?: string;
    field: string;
}

const FormItem: FC<IFormItemProps> = props => {
    return (
        <div className={styles.FormItem}>
            <label
                htmlFor={props.id}
                className={styles.Label}
            >
                {props.text}
            </label>
            <Input
                id={props.id}
                type={props.type ?? 'text'}
                value={props.value}
                onChange={v => props.onChange({...props.userData, [props.field]: v})}
                className={props.className}
                size='lg'
                required={props.required}
                max={props.max}
                isInvalid={props.isInvalid}
                error={props.error}
            />
        </div>
    );
};

export default FormItem;