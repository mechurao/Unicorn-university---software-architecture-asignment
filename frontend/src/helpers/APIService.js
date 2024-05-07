const apiUrl = "http://localhost:3001/api/";
const authUrl = `${apiUrl}auth/`;
const toiletUrl = `${apiUrl}toilet/`

const signUpUrl = `${authUrl}sign-up`;
const  signInUrl = `${authUrl}sign-in`;

export function APIService(){
    async  function signUp(user){
        try {
            let response = await fetch(signUpUrl, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            const result = {
                status: response.status,
                data: data
            };
            return result;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            return {
                status: 500,
            };
        }

    }

    return {signUp}
}



