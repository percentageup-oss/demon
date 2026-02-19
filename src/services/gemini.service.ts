
import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, GenerativeModel } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  private model: GenerativeModel;
  private chatSession: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY']! });
    // Initialize defaults, but methods will re-use or create specific configurations
  }

  getChatSession(): Chat {
    if (!this.chatSession) {
      this.chatSession = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are Buddy, a friendly, encouraging, and smart AI study companion for students in Class 1 to 10 following the Kerala State Syllabus. You explain concepts simply, can speak in English and Malayalam (Manglish is okay too), and love to use emojis. Keep answers concise and age-appropriate.',
        }
      });
    }
    return this.chatSession;
  }

  async sendMessage(message: string): Promise<string> {
    const chat = this.getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't think of an answer right now.";
  }

  async generatePaper(grade: string, subject: string, topic: string): Promise<string> {
    const prompt = `Create a model question paper for Class ${grade} Kerala State Syllabus, Subject: ${subject}. 
    Focus on the topic: "${topic}". 
    Structure it with:
    1. Multiple Choice Questions (5 questions)
    2. Short Answer Questions (3 questions)
    3. Long Answer Questions (1 question)
    
    Output the result in clean Markdown format with bold headings. Do not include answer keys.`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate paper.";
  }

  async generateStudyPlan(grade: string, subjects: string[]): Promise<string> {
    const prompt = `Create a fun and realistic 1-week study plan for a Class ${grade} student. 
    Subjects: ${subjects.join(', ')}. 
    Format it as a JSON array of objects, where each object has 'day' (e.g., 'Monday'), 'focus' (subject), and 'activity' (short description).
    Ensure the JSON is raw text, no markdown code blocks around it.`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return response.text || "[]";
  }
}
