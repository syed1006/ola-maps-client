export interface PlacesAutoCompleteRequest {
    input: string;
    location?: string;
    radius?: number;
    strictbounds?: boolean;
}

export interface PlacesDetailsRequest {
    place_id: string;
}

export interface GeocodeRequest {
    address: string;
    language?: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export type ReverseGeocodeRequest = Coordinates;

export interface GetDirectionsOptions {
    alternatives?: boolean;
    steps?: boolean;
    overview?: string;
    language?: string;
    traffic_metadata?: boolean;
}
