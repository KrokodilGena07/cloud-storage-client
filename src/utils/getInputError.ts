import {IError} from '@/models/IError';

export const getInputError = (errors: IError[]) => {
    return (field: string) => {
        return errors?.find(err => err.path === field)?.msg
    };
};