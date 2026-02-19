
import { Component, ElementRef, ViewChild, signal, inject, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { NgClass } from '@angular/common';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'buddy';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <div class="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <!-- Chat Header -->
      <div class="bg-indigo-600 p-4 text-white flex items-center gap-3">
        <div class="w-10 h-10 bg-white rounded-full p-1">
           <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Buddy" alt="Buddy" class="w-full h-full" />
        </div>
        <div>
          <h2 class="font-bold text-sm">Buddy AI</h2>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-xs text-indigo-100">Online</span>
          </div>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50" #scrollContainer>
        @if (messages().length === 0) {
          <div class="flex flex-col items-center justify-center h-full text-center p-6 text-slate-400">
             <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <span class="text-3xl">👋</span>
             </div>
             <p class="font-medium text-slate-600 mb-2">Hi! I'm Buddy.</p>
             <p class="text-sm">Ask me about your homework, science projects, or math problems!</p>
          </div>
        }

        @for (msg of messages(); track msg.id) {
          <div class="flex w-full" [class.justify-end]="msg.sender === 'user'">
            @if (msg.sender === 'buddy') {
              <div class="w-8 h-8 rounded-full bg-white border border-slate-100 p-1 mr-2 shrink-0 self-end">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Buddy" class="w-full h-full" />
              </div>
            }
            
            <div 
              class="max-w-[80%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed whitespace-pre-wrap"
              [class.bg-indigo-600]="msg.sender === 'user'"
              [class.text-white]="msg.sender === 'user'"
              [class.rounded-br-none]="msg.sender === 'user'"
              [class.bg-white]="msg.sender === 'buddy'"
              [class.text-slate-700]="msg.sender === 'buddy'"
              [class.rounded-bl-none]="msg.sender === 'buddy'"
              [class.border]="msg.sender === 'buddy'"
              [class.border-slate-100]="msg.sender === 'buddy'">
              {{ msg.text }}
            </div>
          </div>
        }

        @if (isLoading()) {
          <div class="flex w-full">
            <div class="w-8 h-8 rounded-full bg-white border border-slate-100 p-1 mr-2 shrink-0 self-end">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Buddy" class="w-full h-full" />
            </div>
            <div class="bg-white border border-slate-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center h-10">
              <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        }
      </div>

      <!-- Input Area -->
      <div class="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          [(ngModel)]="newMessage" 
          (keyup.enter)="sendMessage()"
          placeholder="Ask a question..." 
          class="flex-1 bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          [disabled]="isLoading()"
        />
        <button 
          (click)="sendMessage()" 
          [disabled]="!newMessage.trim() || isLoading()"
          class="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements AfterViewChecked {
  private geminiService = inject(GeminiService);
  
  messages = signal<Message[]>([]);
  newMessage = '';
  isLoading = signal(false);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  async sendMessage() {
    if (!this.newMessage.trim() || this.isLoading()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: this.newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, userMsg]);
    const prompt = this.newMessage;
    this.newMessage = '';
    this.isLoading.set(true);

    try {
      const response = await this.geminiService.sendMessage(prompt);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'buddy',
        timestamp: new Date()
      };
      this.messages.update(msgs => [...msgs, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! I'm having trouble connecting to the internet. Please try again.",
        sender: 'buddy',
        timestamp: new Date()
      };
      this.messages.update(msgs => [...msgs, errorMsg]);
    } finally {
      this.isLoading.set(false);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
