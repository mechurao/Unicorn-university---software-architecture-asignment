const apiUrl = "http://localhost:3001/api/";
const authUrl = `${apiUrl}auth/`;
const toiletUrl = `${apiUrl}toilet/`

const signUpUrl = `${authUrl}sign-up`;
const  signInUrl = `${authUrl}sign-in`;

export function APIService(){
    async  function signUp(user){
        let res = await  fetch(signUpUrl,{
            method: 'POST',
            body:JSON.stringify(
                user
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(res.status);
        console.log(res.response);

    }

    return {signUp}
}



