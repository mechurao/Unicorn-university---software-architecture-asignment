const apiUrl = "http://localhost:3001/api/";
const authUrl = `${apiUrl}auth/`;
const toiletUrl = `${apiUrl}toilet/`;

const signUpUrl = `${authUrl}sign-up`;
const signInUrl = `${authUrl}sign-in`;

const getToiletsUrl = `${toiletUrl}get-toilets`;

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
                console.error(`Server Error: ${response.status}`);
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

    return { signUp, getToilets };
}
