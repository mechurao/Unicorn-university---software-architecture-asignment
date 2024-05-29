const apiUrl = "http://localhost:3001/api/";
const authUrl = `${apiUrl}auth/`;
const toiletUrl = `${apiUrl}toilet/`;

const signUpUrl = `${authUrl}sign-up`;
const signInUrl = `${authUrl}sign-in`;
const logoutURL = `${authUrl}logout`;
const checkTokenUrl = `${authUrl}check-token`;

const getToiletsUrl = `${toiletUrl}get-toilets`;
const addToiletUrl = `${toiletUrl}add-toilet`;
const toiletDetailUrl = `${toiletUrl}/get-detail`;

export function APIService() {
    async function signUp(user) {
        try {
            let response = await fetch(signUpUrl, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            console.error("Sign up error", error);
            return {
                status: 500,
            };
        }
    }

    async function signIn(user){
        try{
            let response = await  fetch(signInUrl,{
               method: 'POST',
               body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            return {
                status: response.status,
                data: data
            };

        }catch (e) {
            console.error(`Sign in error : ${e}`);
            return {
                status:500,
            };
        }
    }

    async function logout(token){
        try{
            let response = await fetch(logoutURL, {
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify({token}),

            });
            return {
                status:response.status
            }
        }catch (err){
            console.error(`Logout error : ${err}`);
            return{
              status:500
            };
        }
    }


    async function getToilets(token, location, radius) {
        try {
            let response = await fetch(getToiletsUrl, {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    location: location,
                    radius: radius
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                return {
                    status: response.status,
                    data: {
                        error: `Failed to fetch toilets data. Server returned status ${response.status}`
                    }
                };
            }
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        } catch (err) {
            console.error("Loading toilets error:", err);
            return {
                status: 500,
                data: {
                    error: "Failed to load toilets."
                }
            };
        }
    }

    async function checkToken(token) {
        try{
            let response = await fetch(checkTokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token}),
            });
            return  response.status === 200;

        }catch(err){
            console.error("Checking token error ", err);
            return false;
        }
    }

    async function addToilet(toilet, token) {
        try {
            let response = await fetch(addToiletUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    toilet: toilet,
                    token: token
                })
            });
            return response.status === 200;
        } catch (err) {
            console.error("Toilet add error:", err);
            return false;
        }
    }

    async function getToiletDetail(tID, token){
        try{
            let response = await  fetch(toiletDetailUrl, {
               method: 'POST',
               headers:{
                   'Content-Type': 'application/json'
               },
                body: JSON.stringify({
                    token:token,
                    id:tID
                })
            });
            if(response.status !== 200){
                return undefined;
            }
            return  await response.json();
        }catch (err){
            console.error("Toilet detail error:", err);
            return undefined;
        }
    }

    return {
        signUp,
        signIn,
        logout,
        getToilets,
        checkToken,
        addToilet,
        getToiletDetail
    };
}
