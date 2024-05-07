import CookieHelper from "./CookieHelper";

class TokenHelper{
    static token_cookie_key = "user_token";

    static saveToken(val){
        CookieHelper.saveCookie(this.token_cookie_key,val);
    }

    static  deleteToken(){
        CookieHelper.deleteCookie(this.token_cookie_key);
    }

    static  getToken(){
        return CookieHelper.getCookieValue(this.token_cookie_key);
    }
}

export  default  TokenHelper;