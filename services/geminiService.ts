
import { GoogleGenAI } from "@google/genai";
import { Sentiment } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const classifySentiment = async (text: string): Promise<Sentiment> => {
  if (!text.trim()) {
    return Sentiment.Unknown;
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the sentiment of the following text. Respond with only one word: "Positive", "Negative", or "Neutral". Text: "${text}"`,
        config: {
          systemInstruction: "You are an expert sentiment analysis AI. Your only task is to classify text sentiment into a single category: Positive, Negative, or Neutral. Do not provide any explanation or additional text.",
          thinkingConfig: { thinkingBudget: 0 } 
        }
    });

    const resultText = response.text.trim().toLowerCase();

    if (resultText.includes('positive')) {
      return Sentiment.Positive;
    } else if (resultText.includes('negative')) {
      return Sentiment.Negative;
    } else if (resultText.includes('neutral')) {
      return Sentiment.Neutral;
    } else {
      console.warn("Unexpected sentiment analysis response:", response.text);
      return Sentiment.Unknown;
    }
  } catch (error) {
    console.error("Error classifying sentiment:", error);
    throw new Error("Failed to get a response from the AI model.");
  }
};
