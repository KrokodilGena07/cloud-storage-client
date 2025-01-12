import {IError} from '@/modules/authForm/models/IError';

export const getInputError = (errors: IError[]) => {
    return (field: string) => {
        return errors?.find(err => err.path === field)?.msg
    };
};