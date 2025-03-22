import React, {FC} from 'react';
import styles from './Avatar.module.css';
import {useUserStore} from '@/store/useUserStore';

interface IAvatarProps {
    className?: string;
    size?: number;
}

const Avatar: FC<IAvatarProps> = ({className, size=50}) => {
    const {user} = useUserStore();

    if (user.image) {
        return (
            <img
                src={user.image}
                alt='avatar'
                className={`${styles.Image} ${className}`}
                width={size}
                height={size}
            />
        );
    }

    return (
        <div
            className={`${styles.Icon} ${className}`}
            style={{width: size, height: size, fontSize: Math.round(size / 1.3)}}
        >
            {user.username[0]}
        </div>
    );
};

export default Avatar;