import Cookies from 'js-cookie';

class CookieHelper {
    static saveCookie(key, value) {
        Cookies.set(key, value, { expires: 7 });
    }

    static getCookieValue(key) {
        return Cookies.get(key);
    }

    static deleteCookie(key) {
        Cookies.remove(key);
    }
}

export default CookieHelper;
