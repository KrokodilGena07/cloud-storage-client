import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';
import {IUserInput} from '@/modules/profile/models';

export class UserApi {
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async updateUser(user: IUserInput) {
        return await axios.put(`${__API__}/users`, user, {
            headers: this.HEADERS,
            withCredentials: true
        }).then(response => response.data);
    }

    static async deleteUser(id: string) {
        await axios.delete(`${__API__}/users/${id}`, {
            headers: this.HEADERS,
            withCredentials: true
        });
    }
}