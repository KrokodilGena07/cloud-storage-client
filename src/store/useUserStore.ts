import {create} from 'zustand';
import {IAuthResponse, IUser} from '@/models/auth';
import {immer} from 'zustand/middleware/immer';

interface IAuthStore {
    accessToken: string | null;
    user: IUser | null;
    setUser: (data: IAuthResponse) => void;
    removeUser: () => void;
}

export const useUserStore = create<IAuthStore>()(immer(set => ({
    accessToken: JSON.parse(localStorage.getItem('Token')),
    user: JSON.parse(localStorage.getItem('User') || 'null'),
    setUser: data => {
        set({
            accessToken: data.accessToken,
            user: data.user
        });
        localStorage.setItem('User', JSON.stringify(data.user));
        localStorage.setItem('Token', JSON.stringify(data.accessToken));
    },
    removeUser: () => {
        localStorage.clear();
        set({
            user: null,
            accessToken: null
        });
    }
})));