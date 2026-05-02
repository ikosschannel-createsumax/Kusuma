
import { GoogleGenAI } from "@google/genai";

export async function getMarketAnalysis(assets: string) {
  try {
    // Inisialisasi di dalam fungsi untuk keamanan
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    if (!apiKey) throw new Error("API Key is missing");

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berikan analisis singkat mengenai tren pasar kripto saat ini berdasarkan daftar aset berikut: ${assets}. Jelaskan dalam bahasa Indonesia yang profesional untuk trader di Indonesia. Fokus pada BTC, ETH, dan USDT/IDR.`,
      config: {
        temperature: 0.7,
        systemInstruction: "Anda adalah analis senior dari bursa aset digital terkemuka di Indonesia."
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Analisis pasar sedang tidak tersedia saat ini.";
  }
}
