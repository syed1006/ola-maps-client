import { FetchClient } from "src/client/fetch-client";
import { PlacesAutoCompleteRequest, PlacesDetailsRequest } from "src/types/requests";

export class Places {
    private client: FetchClient;
    private apiKey: string;

    constructor(client: FetchClient, apiKey: string) {
        this.client = client;
        this.apiKey = apiKey;
    }

    async autocomplete(req: PlacesAutoCompleteRequest) {
        const url = "/places/v1/autocomplete";
        return await this.client.get(url, {
            params: {
                ...req,
                api_key: this.apiKey,
            },
        });
    }

    async details(req: PlacesDetailsRequest) {
        const url = "/places/v1/details";
        return await this.client.get(url, {
            params: {
                place_id: req.place_id,
                api_key: this.apiKey,
            },
        });
    }

    async advancedDetails(req: PlacesDetailsRequest) {
        const url = "/places/v1/details/advanced";
        return await this.client.get(url, {
            params: {
                place_id: req.place_id,
                api_key: this.apiKey,
            },
        });
    }
}
