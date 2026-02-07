
import { GoogleGenAI, Type } from "@google/genai";
import { CategoryKey } from "../types";
import { CATEGORIES } from "../constants";

export async function fetchGlobalCategoryData(category: CategoryKey): Promise<Record<string, number>> {
  // Wir wechseln zu gemini-3-flash-preview, da dieses Modell höhere Rate-Limits für Gratis-Keys hat
  // und schneller große Mengen an strukturierten Daten (180+ Länder) generieren kann.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const cat = CATEGORIES[category];
  
  const prompt = `Du bist ein globaler Statistik-Bot. Erstelle eine Liste mit Daten für die Weltkarte.
  Metrik: "${cat.label}"
  Einheit: ${cat.unit}
  Jahr: 2023/2024
  
  ANWEISUNGEN:
  1. Erstelle Daten für so viele Länder wie möglich (Ziel: 180+). 
  2. Verwende AUSSCHLIESSLICH ISO-3166-1 alpha-3 Codes (z.B. DEU, USA, CHN, FRA, IND, BRA, etc.).
  3. Die Werte müssen realistisch sein für "${cat.label}" in "${cat.unit}".
  4. Gib NUR das geforderte JSON-Array zurück. Keine Einleitung, kein Text.
  
  Format: [{"code": "USA", "value": 123.4}, ...]`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Deaktivieren des Thinking-Prozesses für schnellere Datenextraktion bei Listen
        thinkingConfig: { thinkingBudget: 0 },
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              code: { 
                type: Type.STRING, 
                description: "ISO-3166-1 alpha-3 Code" 
              },
              value: { 
                type: Type.NUMBER, 
                description: "Numerischer Wert" 
              }
            },
            required: ["code", "value"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      console.warn("Leere Antwort von Gemini erhalten.");
      return {};
    }
    
    const dataArray = JSON.parse(text.trim());
    const result: Record<string, number> = {};
    
    if (Array.isArray(dataArray)) {
      dataArray.forEach((item: { code: string; value: number }) => {
        if (item.code && typeof item.value === 'number') {
          result[item.code.toUpperCase()] = item.value;
        }
      });
    }
    
    console.log(`Erfolgreich Daten für ${Object.keys(result).length} Länder geladen.`);
    return result;
  } catch (error) {
    console.error("Fehler beim Abrufen der globalen Daten (DataService):", error);
    // Falls die API komplett blockiert, geben wir ein leeres Objekt zurück, damit die App nicht abstürzt
    return {};
  }
}
