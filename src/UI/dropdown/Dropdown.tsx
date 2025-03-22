import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Dropdown.module.css'
import DropdownIcon from '@/assets/svg/dropdownIcon.svg';
import {IDropdownItem} from '@/models';

interface DropdownProps {
    value: any;
    onChange: (value: any) => void;
    options: IDropdownItem[];
    variant?: 'primary' | 'default';
    className?: string;
    defaultValue?: string;
}

const Dropdown: FC<DropdownProps> = props => {
    const selectedStyle = styles[`${props.variant || 'default'}_selected`];
    const [isOpen, setIsOpen] = useState(false);

    const optionHandler = (opt: string) => {
        props.onChange(opt);
        setIsOpen(!isOpen);
    };

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as HTMLElement)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            window.addEventListener('click', close);
        }

        return () => {
            window.removeEventListener('click', close);
        }
    }, [isOpen]);

    const dropdownHandler = () => setIsOpen(!isOpen);

    const dropdownTitle = props.options?.find(opt => opt.value === props.value)?.title;

    return (
        <div
            className={`${styles.Dropdown} ${props.className}`}
            onClick={dropdownHandler}
            ref={ref}
        >
            <div
                className={`${styles.Head} ${styles[props.variant || 'default']}`}
            >
                <div>{dropdownTitle || props.defaultValue || 'not selected'}</div>
                <DropdownIcon className={styles.Icon}/>
            </div>
            {isOpen &&
                <div className={styles.Menu}>
                    {!props.options?.length &&
                        <div className={styles.NoData}>
                            No data
                        </div>
                    }
                    {props.options?.map(option =>
                        <div
                            key={option.value}
                            onClick={() => optionHandler(option.value)}
                            className={`${styles.MenuIcon} ${option.value === props.value && selectedStyle}`}
                        >
                            {option.title}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Dropdown;