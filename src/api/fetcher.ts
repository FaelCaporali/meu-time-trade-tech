import axios from "axios";
import APIConfig from "../types/api/config";

export default async function fetcher (config: APIConfig) {
    const response = await axios.get(config.url, {
        headers: config.headers,
    });
    if (response.status === 200) {
        return response.data;
    }
    throw new Error(response.statusText); 
}
