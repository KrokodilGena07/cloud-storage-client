import {IError} from '@/modules/authForm/models';

export const getInputError = (errors: IError[]) => {
    return (field: string) => {
        return errors?.find(err => err.path === field)?.msg
    };
};