
export const LOGGED_USER_STORAGE: string = "logged_user";

export class LoginUserDTO {
    username: string;
    password: string;
}

export class LoggedUser {
    uuid: string;
    fullName: string;
    alias: string;
    username: string;
    access_token: string
}