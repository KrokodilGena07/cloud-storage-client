import axios from 'axios';
import {IAuthResponse, IUserInput} from '@/models/auth';

export class AuthApi {
    static async registration(data: IUserInput): Promise<IAuthResponse> {
        const formData = new FormData();
        for (const formDataKey in data) {
            formData.append(formDataKey, data[formDataKey as keyof typeof data]);
        }
        return await this.auth(formData, 'registration');
    }

    static async login(data: IUserInput | FormData): Promise<IAuthResponse> {
        return await this.auth(data, 'login');
    }

    private static async auth(data: IUserInput | FormData, path: string): Promise<IAuthResponse> {
        return await axios.post(`${__API__}/auth/${path}`, data, {
            withCredentials: true
        }).then(response => response.data);
    }
}