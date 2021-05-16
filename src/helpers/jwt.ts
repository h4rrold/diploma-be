import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export const getAccessToken = (username: string):string => {
    return jwt.sign({name: username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

export const getRefreshtoken = (username:string):string => {
    return jwt.sign({name: username}, process.env.REFRESH_TOKEN_SECRET);
}

export const verifyRefreshToken = (refreshToken:string, onSuccess: Function, onError: Function):void => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user: User) => {
        if(err) onError && onError(err);
        onSuccess && onSuccess(user);
    });
}


/** TO DO: Replace refresh token list with using DB/Redis implementation. */
export  const refreshTokensList = [];