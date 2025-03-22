import {FormEvent, useState} from 'react';
import {AxiosError} from 'axios';
import {IErrorData} from '@/modules/authForm/models/IErrorData';
import {IError} from '@/models/IError';

export const useSubmit = (
    send: (data: any) => Promise<any>,
    data: any,
    callback: (data: any) => void,
    preCallback?: () => void
) => {
    const [errorText, setErrorText] = useState(null);
    const [errors, setErrors] = useState<IError[]>(null);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(null);
        setErrorText(null);
        if (preCallback) {
            preCallback();
        }
        try {
            await send(data)
                .then(data => callback(data));
        } catch (error) {
            const errorData = (error as AxiosError<IErrorData>).response.data;
            if (!errorData.errors?.length) {
                setErrorText(errorData.message);
            }
            setErrors(errorData.errors);
        }
    };

    return {
        submit,
        errorText,
        errors,
        setErrors,
        setErrorText
    };
};