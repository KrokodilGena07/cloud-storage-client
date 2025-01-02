export interface IUserInput {
    username: string;
    email: string;
    password: string;
    image?: File;
}

export interface IErrorData {
    message: string;
    errors: IError[];
}

export interface IError {
    path: string;
    msg: string;
}