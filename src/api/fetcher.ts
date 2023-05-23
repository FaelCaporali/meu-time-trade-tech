import axios from "axios";
import IAPIConfig from "../types/api/config";

export default async function fetcher (config: IAPIConfig) {
    const response = await axios.get(config.url, {
        headers: config.headers,
    });
    if (response.status === 200) {
        return response.data;
    }
    throw new Error(response.statusText); 
}
