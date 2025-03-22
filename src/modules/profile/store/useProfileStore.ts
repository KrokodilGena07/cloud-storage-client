import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {UserApi} from '@/modules/profile/api';
import {IUserInput} from '@/modules/profile/models';
import {IUser} from '@/models/auth';

interface IProfileStore {
    isLoading: boolean;
    updateUser: (user: IUserInput) => Promise<IUser>;
}

export const useProfileStore = create<IProfileStore>()(immer(set => ({
    isLoading: false,
    updateUser: async (user) => {
        set({isLoading: true})
        try {
            const response = await UserApi.updateUser(user);
            set({isLoading: false});
            return response;
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    }
})));