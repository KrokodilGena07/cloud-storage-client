import axios from 'axios';
import {IAuthResponse} from '@/models/auth';

export class AuthApi {
    static async logout(): Promise<void> {
        await axios.post(`${__API__}/auth/logout`, null, {
            withCredentials: true
        });
    }

    static async refresh(): Promise<IAuthResponse> {
        return await axios.get(`${__API__}/auth/refresh`, {
            withCredentials: true
        }).then(response => response.data);
    }
}