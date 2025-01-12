import React, {FC} from 'react';
import styles from './Avatar.module.css';
import {useUserStore} from '@/store/useUserStore';

interface IAvatarProps {
    className?: string;
}

const Avatar: FC<IAvatarProps> = ({className}) => {
    const {user} = useUserStore();

    if (user.image) {
        return (
            <img
                src={user.image}
                alt='avatar'
                className={`${styles.Image} ${className}`}
            />
        );
    }

    return (
        <div className={`${styles.Icon} ${className}`}>
            {user.username[0]}
        </div>
    );
};

export default Avatar;