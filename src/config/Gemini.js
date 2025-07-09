import { GoogleGenerativeAI } from "@google/generative-ai";

// You should not hard-code your API key in production.
// Consider using environment variables.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Debug log to check environment variables
console.log('Available env vars:', {
    VITE_GEMINI_API_KEY: API_KEY ? 'Present' : 'Missing',
    'import.meta.env': import.meta.env
});

if (!API_KEY) {
    throw new Error(
        "API key is missing! Please make sure you have created a .env.local file in the root directory with VITE_GEMINI_API_KEY=your_api_key"
    );
}

let genAI;
try {
    genAI = new GoogleGenerativeAI(API_KEY);
} catch (error) {
    console.error("Failed to initialize GoogleGenerativeAI:", error);
    throw error;
}

const run = async (prompt) => {
    if (!genAI) {
        throw new Error("Gemini API not initialized.");
    }

    // Get a generative model with grounding enabled
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        tools: [{
            "googleSearch": {}
        }],
        // NEW: Add this configuration to force the model to use a tool
        toolConfig: {
            functionCallingConfig: {
                // Setting the mode to ANY forces the model to call a tool.
                // Since googleSearch is the only one available, it will be used.
                mode: "ANY",
            },
        },
    });

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        console.log(response.text());
        return response.text();
        
    } catch (error) {
        console.error("Error generating content:", error);
        if (error.message.includes('API key not valid')) {
            throw new Error("The provided API key is not valid. Please check your .env.local file.");
        }
        throw new Error("An error occurred while communicating with the Gemini API.");
    }
};

export default run;
