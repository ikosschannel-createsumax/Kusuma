
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMarketAnalysis(assets: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berikan analisis singkat mengenai tren pasar kripto saat ini berdasarkan daftar aset berikut: ${assets}. Jelaskan dalam bahasa Indonesia yang profesional untuk trader di Indonesia. Fokus pada BTC, ETH, dan USDT/IDR.`,
      config: {
        temperature: 0.7,
        systemInstruction: "Anda adalah analis senior dari bursa aset digital terkemuka di Indonesia. Gunakan gaya bahasa yang informatif dan akurat."
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Maaf, sistem analisis AI sedang sibuk. Silakan coba lagi nanti.";
  }
}
