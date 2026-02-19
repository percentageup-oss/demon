
import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-papers',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <div class="flex flex-col gap-4 animate-fade-in">
      
      <!-- Generator Card -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="text-2xl">📝</span> Exam Paper Generator
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Class</label>
            <div class="grid grid-cols-5 gap-2">
               @for (c of classes; track c) {
                 <button 
                  (click)="selectedClass.set(c)"
                  class="h-10 rounded-xl text-sm font-semibold transition-all border"
                  [class.bg-teal-500]="selectedClass() === c"
                  [class.text-white]="selectedClass() === c"
                  [class.border-teal-500]="selectedClass() === c"
                  [class.bg-slate-50]="selectedClass() !== c"
                  [class.text-slate-600]="selectedClass() !== c"
                  [class.border-slate-200]="selectedClass() !== c"
                  [class.hover:bg-teal-50]="selectedClass() !== c">
                   {{ c }}
                 </button>
               }
            </div>
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Subject</label>
             <select [(ngModel)]="selectedSubject" class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none">
                <option value="" disabled>Select a subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Social Science">Social Science</option>
                <option value="English">English</option>
                <option value="Malayalam">Malayalam</option>
             </select>
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Focus Topic</label>
             <input type="text" [(ngModel)]="topic" placeholder="e.g., Photosynthesis, Trigonometry" class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
          </div>

          <button 
            (click)="generate()" 
            [disabled]="isGenerating() || !selectedSubject || !topic"
            class="w-full py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2">
            @if (isGenerating()) {
               <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
               Generating...
            } @else {
               Generate Paper
            }
          </button>
        </div>
      </div>

      <!-- Result Area -->
      @if (generatedPaper()) {
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
           <div class="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
              <div>
                <h3 class="font-bold text-slate-800 text-lg">Model Paper</h3>
                <p class="text-xs text-slate-500">Class {{ selectedClass() }} • {{ selectedSubject }}</p>
              </div>
              <button class="text-teal-600 text-sm font-bold bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                 Download PDF
              </button>
           </div>
           
           <div class="prose prose-sm prose-slate max-w-none font-sans text-slate-700">
              <pre class="whitespace-pre-wrap font-sans text-sm">{{ generatedPaper() }}</pre>
           </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PapersComponent {
  private geminiService = inject(GeminiService);

  classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  selectedClass = signal('10');
  selectedSubject = '';
  topic = '';
  
  isGenerating = signal(false);
  generatedPaper = signal<string | null>(null);

  async generate() {
    if (this.isGenerating()) return;
    
    this.isGenerating.set(true);
    this.generatedPaper.set(null);
    
    try {
      const result = await this.geminiService.generatePaper(this.selectedClass(), this.selectedSubject, this.topic);
      this.generatedPaper.set(result);
    } catch (e) {
      console.error(e);
      this.generatedPaper.set("Error generating paper. Please try again.");
    } finally {
      this.isGenerating.set(false);
    }
  }
}
