import axios from 'axios';
import { getBearerToken } from './get-bearer-token-api';

// Function to create a new customer
export async function createSalesQuote(): Promise<string | undefined>  {
    const url = 'https://api.businesscentral.dynamics.com/v2.0/54e9e9d5-365f-4d2f-99cd-9c235c8aae60/production/api/v2.0/companies(4d7f690d-6dab-ee11-a56d-6045bdacc749)/salesQuotes';
    
    const bearerToken = await getBearerToken();
    // Request body
    const data = {
        documentDate: "2024-02-01",
        customerNumber: "10000",
        currencyCode: "GBP"
    };

    // Set up the request headers
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        // Perform the POST request
        const response = await axios.post(url, data, config);
        console.log('Customer created:', response.data);

        // Return the display name of the created customer
        return response.data.number;
    } catch (error) {
        console.error('Error creating customer:', error);
    }
}
