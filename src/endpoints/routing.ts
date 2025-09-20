import { FetchClient } from "src/client/fetch-client";
import { Coordinates, GetDirectionsOptions } from "src/types/requests";

export class Routing {
    private client: FetchClient;
    private apiKey: string;

    constructor(client: FetchClient, apiKey: string) {
        this.client = client;
        this.apiKey = apiKey;
    }

    async getDirections(
        origin: Coordinates,
        destination: Coordinates,
        options: GetDirectionsOptions = {},
    ) {
        const originLatLng = `${origin.latitude},${origin.longitude}`;
        const destinationLatLng = `${destination.latitude},${destination.longitude}`;

        const params = {
            api_key: this.apiKey,
            origin: originLatLng,
            destination: destinationLatLng,
            alternatives: options.alternatives ?? false,
            steps: options.steps ?? false,
            overview: options.overview ?? "full",
            language: options.language ?? "en",
            traffic_metadata: options.traffic_metadata ?? false,
        };

        return await this.client.post("/routing/v1/directions", null, {
            params,
            headers: { "Accept": "application/json" },
        });
    }
}
