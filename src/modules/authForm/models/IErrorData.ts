import {IError} from '@/modules/authForm/models/IError';

export interface IErrorData {
    message: string;
    errors: IError[];
}