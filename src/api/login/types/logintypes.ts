export type MusiceLoginUserInfo = {
    account: string,
    token: string,
    code: number,
}

export interface LoginInfo {
    password: string,
    phone: null | number
}