import { Property, PropertyFilter } from '../types/property';

const fakeProperties: Property[] = [
    { id: 1, name: 'Luxury Condo', price: 500000, bedrooms: 2, bathrooms: 2, area: 1200 },
    { id: 2, name: 'Beachfront Villa', price: 1200000, bedrooms: 4, bathrooms: 3, area: 2500 },
    { id: 3, name: 'Downtown Apartment', price: 350000, bedrooms: 1, bathrooms: 1, area: 800 },
    { id: 4, name: 'Family Home', price: 750000, bedrooms: 3, bathrooms: 2.5, area: 1800 },
    { id: 5, name: 'Penthouse Suite', price: 2000000, bedrooms: 3, bathrooms: 3.5, area: 3000 },
];

export async function searchProperties(filter: PropertyFilter): Promise<Property[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return fakeProperties.filter((property) => {
        if (filter.minPrice && property.price < filter.minPrice) return false;
        if (filter.maxPrice && property.price > filter.maxPrice) return false;
        if (filter.minBedrooms && property.bedrooms < filter.minBedrooms) return false;
        if (filter.maxBedrooms && property.bedrooms > filter.maxBedrooms) return false;
        if (filter.minBathrooms && property.bathrooms < filter.minBathrooms) return false;
        if (filter.maxBathrooms && property.bathrooms > filter.maxBathrooms) return false;
        if (filter.minArea && property.area < filter.minArea) return false;
        if (filter.maxArea && property.area > filter.maxArea) return false;
        return true;
    });
}
