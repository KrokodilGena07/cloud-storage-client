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

export interface IUserInput {
    username: string;
    email: string;
    password: string;
    image?: File;
}