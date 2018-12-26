export const BASE_URL: string = 'https://localhost:44318/';
export const LOGIN: string = 'api/Account/Login';

export function combine(url1: string, url2: string) {
    if (url1.endsWith('/')) {
        url1 = url1.substr(0, url1.length - 1);
    }
    if (url2.startsWith('/')) {
        return url1 + url2;
    } else {
        return url1 + '/' + url2;
    }
}