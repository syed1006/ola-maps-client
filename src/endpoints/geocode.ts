import { FetchClient } from "src/client/fetch-client";
import { GeocodeRequest, ReverseGeocodeRequest } from "src/types/requests";

export class Geocode {
    private client: FetchClient;
    private apiKey: string;

    constructor(client: FetchClient, apiKey: string) {
        this.client = client;
        this.apiKey = apiKey;
    }

    async geocode(req: GeocodeRequest) {
        return await this.client.get("/places/v1/geocode", {
            params: {
                address: req.address,
                language: req.language || "English",
                api_key: this.apiKey,
            },
        });
    }

    async reverseGeocode(req: ReverseGeocodeRequest) {
        return await this.client.get("/places/v1/reverse-geocode", {
            params: {
                latlng: `${req.latitude},${req.longitude}`,
                api_key: this.apiKey,
            },
        });
    }
}
