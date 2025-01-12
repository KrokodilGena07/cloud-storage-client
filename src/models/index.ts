export interface IUser {
    id: string;
    username: string;
    email: string;
    image: string | null;
    isActivated: boolean;
}

export interface IAuthResponse {
    user: IUser;
    accessToken: string;
}

export type UISize = 'sm' | 'md' | 'lg';

export enum flagNames {
    PROFILE = 'profile',
    IMAGE = 'image',
    ERROR = 'error',
    MOBILE = 'mobile'
}