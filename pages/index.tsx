import React, { useState } from 'react';
import Head from 'next/head';
import Chatbot from '../components/Chatbot';
import PropertyList from '../components/PropertyList';
import { Property } from '../types/property';

export default function Home(): JSX.Element {
  const [properties, setProperties] = useState<Property[]>([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Miami Property Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Miami Property Finder</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Chatbot setProperties={setProperties} />
          <PropertyList properties={properties} />
        </div>
      </main>
    </div>
  );
}
