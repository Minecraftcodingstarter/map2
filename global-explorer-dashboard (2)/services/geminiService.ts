
import { GoogleGenAI, Type } from "@google/genai";
import { CategoryKey, DetailedInfo } from "../types";
import { CATEGORIES } from "../constants";

export async function fetchCountryDetails(countryName: string, category: CategoryKey): Promise<DetailedInfo> {
  // Fixed: Always create a new GoogleGenAI instance with the direct process.env.API_KEY right before making a call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const categoryLabel = CATEGORIES[category].label;
  const prompt = `Gib mir detaillierte Informationen über ${countryName} im Kontext von ${categoryLabel}. 
  Strukturiere die Antwort als JSON auf Deutsch.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Fixed: Use responseSchema to ensure reliable and strictly typed JSON output as per guidelines.
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Eine kurze Zusammenfassung des Landes in Bezug auf die Kategorie."
            },
            keyStats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING }
                },
                required: ["label", "value"]
              }
            },
            funFact: {
              type: Type.STRING,
              description: "Ein interessanter Fakt über das Land."
            }
          },
          required: ["summary", "keyStats", "funFact"]
        }
      }
    });

    // Fixed: response.text is a property, not a method.
    const text = response.text;
    if (!text) throw new Error("Keine Antwort vom Modell erhalten.");

    const result = JSON.parse(text.trim());
    return {
      summary: result.summary || "Keine Zusammenfassung verfügbar.",
      keyStats: result.keyStats || [],
      funFact: result.funFact || "Kein interessanter Fakt gefunden."
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: `Informationen zu ${countryName} konnten nicht geladen werden.`,
      keyStats: [],
      funFact: "Es gab ein Problem bei der Datenabfrage."
    };
  }
}
