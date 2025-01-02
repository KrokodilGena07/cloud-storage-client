import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IAuthResponse} from '@/models';
import {IUserInput} from '@/modules/authForm/models';
import {AuthApi} from '@/modules/authForm/api';

interface IAuthStore {
    isLoading: boolean;
    registration: (userData: IUserInput) => Promise<IAuthResponse>;
    login: (userData: IUserInput) => Promise<IAuthResponse>;
}

export const useAuthStore = create<IAuthStore>()(immer(set => ({
    isLoading: false,
    registration: async userData => {
        set({isLoading: true});
        try {
            const data = await AuthApi.registration(userData);
            set({isLoading: false});
            return data;
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    },
    login: async userData => {
        set({isLoading: true});
        try {
            const data = await AuthApi.login(userData);
            set({isLoading: false});
            return data;
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    }
})));