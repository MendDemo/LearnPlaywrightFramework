import axios from 'axios';

// Function to get bearer token
export async function getBearerToken(): Promise<string> {
    const tokenEndpoint = 'https://login.microsoftonline.com/54e9e9d5-365f-4d2f-99cd-9c235c8aae60/oauth2/v2.0/token';
    const payload = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: '9d0125d4-c5b1-4ad4-b205-8e356bfc0de8',
        client_secret: 'ZPy8Q~0i.ZHa81m61PDj.2ih9GTqEaiIEDT~6b.L',
        scope: 'https://api.businesscentral.dynamics.com/.default'
    });

    try {
        const response = await axios.post(tokenEndpoint, payload.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extract the bearer token from the response
        const bearerToken = response.data.access_token;
        //console.log('Bearer Token:', bearerToken);

        return bearerToken;
    } catch (error) {
        console.error('Error fetching bearer token:', error);
        throw error;
    }
}

