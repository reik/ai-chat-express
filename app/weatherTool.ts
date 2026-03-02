import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the current weather in a location',
  parameters: z.object({
    location: z.string().describe('The city and state, e.g. San Francisco, CA'),
  }),
  execute: async ({ location }: { location: string }): Promise<{ temperature?: string; unit?: string; description?: string; error?: string }> => {
    if (!location) {
      return { error: 'Location is required' };
    }
    try {
      const weatherData = await fetch(
        `https://wttr.in/${encodeURIComponent(location)}?format=j1`
      );
      const weather = await weatherData.json();

      if (weather.current_condition && weather.current_condition[0]) {
        return {
          temperature: weather.current_condition[0].temp_F,
          unit: 'F',
          description: weather.current_condition[0].weatherDesc[0].value,
        };
      } else {
        return { error: 'Could not retrieve weather information for the specified location.' };
      }
    } catch (error) {
      return { error: 'An error occurred while fetching weather data.' };
    }
  },
});

