
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScript = async (
    contactName: string,
    company: string,
    position: string,
    platform: string,
    messageType: string,
    context: string,
    focus: string
): Promise<string> => {
    const systemInstruction = `You are an expert sales scriptwriter for the Blockchain Summit LATAM 2025. You must follow the provided sales manual's principles precisely. Your goal is to generate a personalized, effective outreach message based on the user's input. Adhere strictly to the tone, structure, and key selling points from the manual. Your response must be only the script text, without any preamble or explanation.`;

    const prompt = `
Generate a sales outreach script with the following details:
- Target Contact: ${contactName}, ${position || 'decision maker'} at ${company}.
- Platform: ${platform}
- Message Type: ${messageType}
- Specific Focus Area: ${focus}
- Optional Context: ${context || 'N/A'}

---
MANUAL RULES & KEY INFORMATION TO USE:
- Event Name: Blockchain Summit LATAM 2025 in Medellín, Colombia.
- Confirmed Attendees (Social Proof): Prioritize mentioning Central Banks (Colombia, Brazil, Mexico, Chile) and BIS. Then, mention institutional players like BlackRock, JP Morgan Colombia, Bancolombia, and Banco Popular.
- Core Value Proposition: Unparalleled access to regulatory decision-makers and institutional leaders in LATAM.
- Tone: Professional, confident, value-first, never desperate.
- Structure:
    1. Greeting (platform-appropriate).
    2. Authority statement (e.g., 'I'm in charge of public relations...').
    3. Core value prop with social proof.
    4. Personalization based on focus area and context.
    5. Clear Call to Action (CTA) ending with a question.
- CRUCIAL RULE (LinkedIn Initial Contact): For a LinkedIn initial contact, you MUST simulate the 2-3 minute wait rule between the greeting and the main pitch. Explicitly state this in the script like: "[Wait 2-3 minutes after they reply to your greeting]".
- Objection Handling: When generating responses to objections, use the provided frameworks. For 'Tell me here first', use the "Value Preview Method": provide a few key names (BIS, 4 Central Banks, BlackRock, JP Morgan) and then justify the need for email for organizational purposes.
---
Now, generate the script.
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });
        
        return response.text.trim();
    } catch (error) {
        console.error("Error generating script with Gemini:", error);
        return "Sorry, there was an error generating the script. Please check the console for details.";
    }
};
