import { Configuration, OpenAIApi } from 'openai';
import { PropertyFilter } from '../types/property';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log('API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);

export async function processUserInput(input: string): Promise<PropertyFilter> {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that extracts property search criteria from user input."
                },
                {
                    role: "user",
                    content: `Extract property search criteria from the following user input: "${input}"`
                }
            ],
            max_tokens: 100,
            n: 1,
            temperature: 0.5,
        });

        const filterText = response.data.choices[0]?.message?.content?.trim();
        return parseFilterText(filterText || '');
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

function parseFilterText(filterText: string): PropertyFilter {
    const filter: PropertyFilter = {};
    const lines = filterText.split('\n');

    for (const line of lines) {
        const [key, value] = line.split(':').map((s) => s.trim());
        const numValue = parseFloat(value);

        switch (key.toLowerCase()) {
            case 'min price':
                filter.minPrice = numValue;
                break;
            case 'max price':
                filter.maxPrice = numValue;
                break;
            case 'min bedrooms':
                filter.minBedrooms = numValue;
                break;
            case 'max bedrooms':
                filter.maxBedrooms = numValue;
                break;
            case 'min bathrooms':
                filter.minBathrooms = numValue;
                break;
            case 'max bathrooms':
                filter.maxBathrooms = numValue;
                break;
            case 'min area':
                filter.minArea = numValue;
                break;
            case 'max area':
                filter.maxArea = numValue;
                break;
        }
    }

    return filter;
}
