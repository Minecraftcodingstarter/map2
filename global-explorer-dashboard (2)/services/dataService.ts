import { GoogleGenAI, Type } from "@google/genai";
import { CategoryKey } from "../types";
import { CATEGORIES } from "../constants";

export async function fetchGlobalCategoryData(category: CategoryKey): Promise<Record<string, number>> {
  // WICHTIG: Nutze import.meta.env für Vite + VITE_ Präfix für Vercel
// Aus Umgebungsvariable lesen
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("API Key fehlt! Bitte VITE_GEMINI_API_KEY in Vercel/Umgebungsvariablen setzen.");
    return {};
  }
console.log("Gemini API Key:", apiKey ? "✅ Vorhanden" : "❌ Fehlt");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); // ✅
  const cat = CATEGORIES[category];
  
  // Wir nutzen gemini-1.5-flash für maximale Stabilität
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING },
            value: { type: Type.NUMBER }
          },
          required: ["code", "value"]
        }
      }
    }
  });

  const prompt = `Du bist ein globaler Statistik-Bot. Erstelle eine Liste mit Daten für die Weltkarte.
  Metrik: "${cat.label}"
  Einheit: ${cat.unit}
  Jahr: 2023/2024
  
  ANWEISUNGEN:
  1. Erstelle Daten für so viele Länder wie möglich (Ziel: 180+). 
  2. Verwende ISO-3166-1 alpha-3 Codes (z.B. DEU, USA, CHN).
  3. Gib NUR das JSON-Array zurück. Keine Einleitung, kein Text.
  Format: [{"code": "USA", "value": 123.4}, ...]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) return {};
    
    const dataArray = JSON.parse(text);
    const formattedResult: Record<string, number> = {};
    
    if (Array.isArray(dataArray)) {
      dataArray.forEach((item: { code: string; value: number }) => {
        if (item.code && typeof item.value === 'number') {
          formattedResult[item.code.toUpperCase()] = item.value;
        }
      });
    }
    
    return formattedResult;
  } catch (error) {
    console.error("Fehler beim Abrufen der globalen Daten:", error);
    return {};
  }
}
