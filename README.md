# Ola Maps SDK

A TypeScript/JavaScript SDK for the Ola Maps API, providing easy access to places, geocoding, routing, and tiles services.

## ⚠️ Important Notice

This SDK has **limited API support** and was created for **personal use**. It currently covers basic functionality for the Ola Maps API endpoints. If you need additional features or encounter issues, feel free to raise improvement PRs at [github](https://github.com/syed1006/ola-maps-client).

## Installation

```bash
npm install ola-maps-sdk
```

## Quick Start

```typescript
import { OlaMapsClient } from "ola-maps-sdk";

// Initialize the client
const client = new OlaMapsClient("your-api-key-here");

// Use the services
const results = await client.places.autocomplete({
    input: "Bangalore",
    location: "12.9716,77.5946",
});
```

## API Reference

### Initialization

```typescript
const client = new OlaMapsClient(apiKey, baseURL?);
```

-   `apiKey`: Your Ola Maps API key (required)
-   `baseURL`: Custom base URL (optional, defaults to `https://api.olamaps.io`)

## Services

### Places Service

#### Autocomplete

Get place suggestions based on input text.

```typescript
const suggestions = await client.places.autocomplete({
    input: "Coffee shop",
    location: "12.9716,77.5946", // lat,lng
    radius: 1000, // optional
    types: "establishment", // optional
});
```

#### Place Details

Get detailed information about a specific place.

```typescript
const details = await client.places.details({
    place_id: "place_id_here",
});
```

#### Advanced Place Details

Get comprehensive details about a place.

```typescript
const advancedDetails = await client.places.advancedDetails({
    place_id: "place_id_here",
});
```

### Geocoding Service

#### Forward Geocoding

Convert addresses to coordinates.

```typescript
const geocodeResult = await client.geocode.geocode({
    address: "Koramangala, Bangalore",
    language: "English", // optional, defaults to English
});
```

#### Reverse Geocoding

Convert coordinates to address.

```typescript
const reverseResult = await client.geocode.reverseGeocode({
    latitude: 12.9716,
    longitude: 77.5946,
});
```

### Routing Service

#### Get Directions

Calculate routes between two points.

```typescript
const directions = await client.routing.getDirections(
    { latitude: 12.9716, longitude: 77.5946 }, // origin
    { latitude: 13.0827, longitude: 80.2707 }, // destination
    {
        alternatives: true, // optional
        steps: true, // optional
        overview: "full", // optional: 'full', 'simplified', 'false'
        language: "en", // optional
        traffic_metadata: false, // optional
    }
);
```

### Tiles Service

#### Get Data Tile JSON

Retrieve vector tile configuration for a dataset.

```typescript
const tileConfig = await client.tiles.getDataTileJSON("dataset-name");
```

#### Get Available Styles

List all available map styles.

```typescript
const styles = await client.tiles.getStyles();
```

#### Get Style by Name

Get specific map style configuration.

```typescript
const style = await client.tiles.getStyleByName("style-name");
```

## Types

The SDK includes TypeScript definitions for all request and response objects:

```typescript
interface GeocodeRequest {
    address: string;
    language?: string;
}

interface ReverseGeocodeRequest {
    latitude: number;
    longitude: number;
}

interface PlacesAutoCompleteRequest {
    input: string;
    location?: string;
    radius?: number;
    types?: string;
    [key: string]: any;
}

interface PlacesDetailsRequest {
    place_id: string;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface GetDirectionsOptions {
    alternatives?: boolean;
    steps?: boolean;
    overview?: "full" | "simplified" | "false";
    language?: string;
    traffic_metadata?: boolean;
}
```

## Error Handling

The SDK uses the underlying HTTP client for error handling. Wrap your calls in try-catch blocks:

```typescript
try {
    const result = await client.places.autocomplete({
        input: "Invalid location",
    });
} catch (error) {
    console.error("API call failed:", error);
}
```

## Examples

### Complete Places Search Flow

```typescript
import { OlaMapsClient } from "ola-maps-sdk";

const client = new OlaMapsClient("your-api-key");

async function searchAndGetDetails() {
    try {
        // 1. Search for places
        const suggestions = await client.places.autocomplete({
            input: "Pizza",
            location: "12.9716,77.5946",
        });

        // 2. Get details for first result
        if (suggestions.predictions?.length > 0) {
            const placeId = suggestions.predictions[0].place_id;
            const details = await client.places.details({ place_id: placeId });
            console.log("Place details:", details);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
```

### Route Planning

```typescript
async function planRoute() {
    const origin = { latitude: 12.9716, longitude: 77.5946 };
    const destination = { latitude: 13.0827, longitude: 80.2707 };

    try {
        const route = await client.routing.getDirections(origin, destination, {
            alternatives: true,
            steps: true,
            traffic_metadata: true,
        });

        console.log("Route found:", route.routes[0]);
    } catch (error) {
        console.error("Routing failed:", error);
    }
}
```

## Limitations

-   This SDK covers basic functionality of the Ola Maps API
-   Limited error handling and validation
-   Created for personal use - production usage may require additional features
-   Not all API endpoints may be implemented

## Contributing

This is a personal project with limited API support. However, contributions are welcome!

To contribute:

1. Fork the repository at [your-repository-url]
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Areas for improvement:

-   Additional API endpoint support
-   Better error handling
-   Response type definitions
-   Input validation
-   Unit tests
-   Documentation improvements

## License

[Your chosen license]

## Support

For issues or feature requests, please:

1. Check existing issues at [your-repository-url]
2. Create a new issue with detailed information
3. Submit a PR with improvements

---

**Note**: Remember to keep your API key secure and never commit it to version control. Consider using environment variables or a secure configuration management system.
