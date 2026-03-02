import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { weatherTool } from './weatherTool';

const result = await streamText({
  model: openai('gpt-4o'),
  tools: { weather: weatherTool },
  maxSteps: 5, // Allows the agent to call tools multiple times in one go
  prompt: 'What is the weather in New York?',
});