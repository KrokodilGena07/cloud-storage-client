import React, {FC} from 'react';
import {Profile} from '@/modules/profile';
import {ProfileForm} from '@/modules/profileForm';
import {ImageForm} from '@/modules/imageForm';

const User: FC = () => {
    return (
        <div>
            <ImageForm/>
            <ProfileForm/>
            <Profile/>
        </div>
    );
};

export default User;