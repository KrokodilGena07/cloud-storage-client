import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';

export class UserApi {
    static async deleteUser(id: string) {
        await axios.delete(`${__API__}/users/${id}`, {
            headers: {
                authorization: `Bearer ${useUserStore.getState().accessToken}`
            },
            withCredentials: true
        });
    }
}