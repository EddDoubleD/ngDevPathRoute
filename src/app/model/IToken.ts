/**
 * jwt token - response on backend
 */
export interface IToken {
    access_token?: string;
    refresh_token?: string;
}