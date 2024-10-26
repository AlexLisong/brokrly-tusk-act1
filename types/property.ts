export interface Property {
    id: number;
    name: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
}

export interface PropertyFilter {
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    minArea?: number;
    maxArea?: number;
}
