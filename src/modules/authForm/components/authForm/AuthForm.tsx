import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react';
import styles from './AuthForm.module.css';
import {Pages} from '@/pages/Pages';
import Button from '@/UI/button/Button';
import Input from '@/UI/input/Input';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuthStore} from '@/modules/authForm/store';
import {AxiosError} from 'axios';
import {useUserStore} from '@/store/useUserStore';
import {IErrorData} from '@/modules/authForm/models/IErrorData';
import {IError} from '@/models/IError';
import {getInputError} from '@/utils/getInputError';
import {inputHandler} from '@/utils/inputHandler';

export const AuthForm: FC = () => {
    const location = useLocation()
    const isLogin = location.pathname !== Pages.AUTH_REGISTRATION;

    const [newUser, setNewUser] = useState({
        username: '', email: '', password: ''
    });
    const [file, setFile] = useState<File>(null);
    const [errorText, setErrorText] = useState(null);
    const [errors, setErrors] = useState<IError[]>(null);

    const {isLoading, registration, login} = useAuthStore();
    const {setUser} = useUserStore();
    const navigate = useNavigate();

    const authorization = useMemo(() => {
        return isLogin ? login : registration;
    }, [location.pathname]);

    const inputError = getInputError(errors);

    const setErr = () => {
        setErrors(null);
        setErrorText(null);
    };

    useEffect(() => {
        setNewUser({username: '', email: '', password: ''});
        setFile(null);
        setErr();
    }, [location.pathname]);

    const newUserHandler = inputHandler(errors, setErrors, newUser, setNewUser);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr();
        await authorization({...newUser, image: file})
            .then(data => {
                setUser(data);
                navigate(Pages.MAIN);
            })
            .catch(err => {
                const error = (err as AxiosError<IErrorData>).response.data;
                if (!error.errors?.length) {
                    return setErrorText(error.message);
                }
                setErrors(error.errors);
            })
    };

    const submitButtonText = isLogin ? 'Sign in' : 'Sign up';

    return (
        <div className={styles.FormWrapper}>
            <form
                className={styles.Form}
                onSubmit={e => submit(e)}
            >
                <h1>{isLogin ? 'Login' : 'Registration'}</h1>
                {!isLogin &&
                    <Input
                        value={newUser.username}
                        onChange={v => newUserHandler(v, 'username')}
                        className={styles.Input}
                        required
                        max={255}
                        placeholder='Username'
                        isInvalid={!!inputError('username')}
                        error={inputError('username')}
                    />
                }
                <Input
                    value={newUser.email}
                    onChange={v => newUserHandler(v, 'email')}
                    className={styles.Input}
                    required
                    max={255}
                    placeholder='Email'
                    type='email'
                    isInvalid={!!inputError('email')}
                    error={inputError('email')}
                />
                <Input
                    value={newUser.password}
                    onChange={v => newUserHandler(v, 'password')}
                    className={styles.Input}
                    required
                    max={30}
                    placeholder='Password'
                    type='password'
                    isInvalid={!!inputError('password')}
                    error={inputError('password')}
                />
                {!isLogin &&
                    <Input
                        onChange={setFile}
                        value={file?.name}
                        type='file'
                        className={styles.Input}
                    />
                }
                {errorText &&
                    <span className={styles.Error}>
                    {errorText}
                </span>
                }
                <Button
                    variant='primary'
                    size='lg'
                    className={styles.SubmitButton}
                >
                    {isLoading ? 'Loading...' : submitButtonText}
                </Button>
                <Link
                    to={isLogin ? Pages.AUTH_REGISTRATION : Pages.AUTH_LOGIN}
                >
                    <Button
                        size='lg'
                        className={styles.LinkButton}
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </Button>
                </Link>
            </form>
        </div>
    );
};