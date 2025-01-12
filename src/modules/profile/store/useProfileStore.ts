import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {UserApi} from '@/modules/profile/api';

interface IProfileStore {
    deleteUser: (id: string) => void;
}

export const useProfileStore = create<IProfileStore>()(immer(set => ({
    deleteUser: async (id) => {
        await UserApi.deleteUser(id).catch(err => {
            console.log(err);
        });
    }
})));