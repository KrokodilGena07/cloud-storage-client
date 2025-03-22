import {IError} from '@/models/IError';

export const inputHandler = (
    errors: IError[],
    setErrors: (error: IError[]) => void,
    data: any,
    setData: (value: any) => void
) => {
    return (value: string, field: string) => {
        if (errors) {
            setErrors(errors.filter(error => error.path !== field));
        }
        setData({...data, [field]: value});
    }
};