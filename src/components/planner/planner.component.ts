
import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';

interface PlanItem {
  day: string;
  focus: string;
  activity: string;
}

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in">
      <div class="bg-gradient-to-r from-amber-200 to-yellow-400 rounded-3xl p-6 text-amber-900 shadow-lg relative overflow-hidden">
         <div class="relative z-10">
            <h2 class="text-2xl font-bold mb-1">Study Planner</h2>
            <p class="text-amber-800 text-sm opacity-90">Let AI organize your week!</p>
            
            <button 
              (click)="generatePlan()"
              [disabled]="isLoading()"
              class="mt-4 bg-white/90 backdrop-blur text-amber-600 font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-white active:scale-95 transition-all text-sm flex items-center gap-2">
              @if (isLoading()) {
                 <span class="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
              }
              Generate New Plan
            </button>
         </div>
         <div class="absolute right-[-20px] bottom-[-20px] text-9xl opacity-20 rotate-12">📅</div>
      </div>

      @if (plan().length > 0) {
        <div class="space-y-3">
          @for (item of plan(); track $index) {
            <div class="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-amber-400 flex gap-4 items-center">
              <div class="flex flex-col items-center justify-center w-14 h-14 bg-amber-50 rounded-xl shrink-0">
                <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{{ item.day.substring(0,3) }}</span>
                <span class="text-xl font-bold text-amber-700">{{ $index + 1 }}</span>
              </div>
              <div>
                <h3 class="font-bold text-slate-800">{{ item.focus }}</h3>
                <p class="text-sm text-slate-500 leading-snug">{{ item.activity }}</p>
              </div>
            </div>
          }
        </div>
      } @else {
         @if (!isLoading()) {
            <div class="text-center py-10 text-slate-400">
               <p>Tap "Generate New Plan" to get started!</p>
            </div>
         }
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
export class PlannerComponent {
  private geminiService = inject(GeminiService);
  isLoading = signal(false);
  plan = signal<PlanItem[]>([]);

  async generatePlan() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    
    // Mock user subjects for now - in a real app this would come from a profile service
    const subjects = ['Mathematics', 'Science', 'English', 'Malayalam'];
    const grade = '9';

    try {
      const jsonStr = await this.geminiService.generateStudyPlan(grade, subjects);
      const parsedPlan = JSON.parse(jsonStr) as PlanItem[];
      this.plan.set(parsedPlan);
    } catch (e) {
      console.error(e);
      // Fallback data if JSON parsing fails or API errors
      this.plan.set([
        { day: 'Monday', focus: 'Mathematics', activity: 'Review Quadratic Equations and solve 5 problems.' },
        { day: 'Tuesday', focus: 'Science', activity: 'Read Chapter 4: Gravity and make summary notes.' },
        { day: 'Wednesday', focus: 'English', activity: 'Write an essay on "My Favorite Hobby".' },
      ]);
    } finally {
      this.isLoading.set(false);
    }
  }
}
