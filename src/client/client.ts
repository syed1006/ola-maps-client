import { Places } from "src/endpoints/places";
import { Tiles } from "src/endpoints/tiles";
import { Routing } from "src/endpoints/routing";
import { FetchClient } from "./fetch-client";
import { Geocode } from "src/endpoints/geocode";

export class OlaMapsClient {
    private apiKey: string;
    private baseURL: string;
    private client: FetchClient;
    public places!: Places;
    public geocode!: Geocode;
    public tiles!: Tiles;
    public routing!: Routing;

    constructor(apiKey: string, baseURL: string = "https://api.olamaps.io") {
        if (!apiKey) {
            throw new Error("API key is required.");
        }

        this.apiKey = apiKey;
        this.baseURL = baseURL;
        this.client = this.createAxiosClient();

        this.initializeEndpoints();
    }

    createAxiosClient(): FetchClient {
        return new FetchClient({
            baseURL: this.baseURL,
            headers: {
                "Accept": "application/json",
            },
        });
    }

    initializeEndpoints() {
        this.places = new Places(this.client, this.apiKey);
        this.geocode = new Geocode(this.client, this.apiKey);
        this.tiles = new Tiles(this.client, this.apiKey);
        this.routing = new Routing(this.client, this.apiKey);
    }
}
