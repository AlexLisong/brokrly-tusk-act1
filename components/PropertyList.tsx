import React from 'react';
import { Property } from '../types/property';

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Properties</h2>
      {properties.length === 0 ? (
        <p>No properties to display. Try searching for properties in Miami.</p>
      ) : (
        <ul className="space-y-4">
          {properties.map((property) => (
            <li key={property.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p>Price: ${property.price.toLocaleString()}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Area: {property.area} sqft</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyList;
