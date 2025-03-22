import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IAuthResponse} from '@/models/auth';
import {AuthApi} from '@/api/AuthApi';
import {AxiosError} from 'axios';

interface IRefreshStore {
    data: IAuthResponse | null;
    isLoading: boolean;
    error: AxiosError | null;
    refresh: () => void;
}

export const useRefreshStore = create<IRefreshStore>()(immer(set => ({
    data: null,
    isLoading: false,
    error: null,
    refresh: async () => {
        set({isLoading: true});
        try {
            const data = await AuthApi.refresh();
            set({isLoading: false, data});
        } catch (e) {
            set({isLoading: false, error: e});
        }
    }
})));