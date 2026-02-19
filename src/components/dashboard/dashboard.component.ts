
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in">
      <!-- Welcome Section -->
      <section>
        <h1 class="text-2xl font-bold text-slate-800">Hello, Student! 👋</h1>
        <p class="text-slate-500">Ready to learn something new today?</p>
      </section>

      <!-- Quick Actions -->
      <section class="grid grid-cols-2 gap-4">
        <a routerLink="/chat" class="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg hover:shadow-xl transition-all active:scale-95 flex flex-col justify-between h-40 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <h3 class="font-bold text-lg">Ask Buddy</h3>
            <p class="text-xs text-indigo-100 opacity-90">Instant doubts solver</p>
          </div>
        </a>

        <a routerLink="/papers" class="group bg-gradient-to-br from-teal-400 to-emerald-600 rounded-3xl p-5 text-white shadow-lg hover:shadow-xl transition-all active:scale-95 flex flex-col justify-between h-40 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
          </div>
          <div>
            <h3 class="font-bold text-lg">Model Papers</h3>
            <p class="text-xs text-teal-100 opacity-90">Practice exams</p>
          </div>
        </a>
      </section>

      <!-- Progress Section (Mock) -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-slate-800">Your Progress</h2>
          <span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Top 10%</span>
        </div>
        
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-600 font-medium">Mathematics</span>
              <span class="text-slate-900 font-bold">85%</span>
            </div>
            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 rounded-full" style="width: 85%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-600 font-medium">Science</span>
              <span class="text-slate-900 font-bold">72%</span>
            </div>
            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-purple-500 rounded-full" style="width: 72%"></div>
            </div>
          </div>
           
           <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-600 font-medium">English</span>
              <span class="text-slate-900 font-bold">92%</span>
            </div>
            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-amber-500 rounded-full" style="width: 92%"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Study Tip -->
      <section class="bg-indigo-50 rounded-3xl p-5 border border-indigo-100 flex gap-4 items-start">
        <div class="bg-white p-2 rounded-xl shadow-sm text-2xl shrink-0">💡</div>
        <div>
          <h3 class="font-bold text-indigo-900 text-sm mb-1">Tip of the day</h3>
          <p class="text-indigo-700 text-xs leading-relaxed">Try the Pomodoro technique! Study for 25 minutes, then take a 5-minute break. It keeps your brain fresh!</p>
        </div>
      </section>
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
export class DashboardComponent {}
