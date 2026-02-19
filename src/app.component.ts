
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      <!-- Background Shapes for Visual Interest -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2"></div>

      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div class="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2" routerLink="/dashboard">
            <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform -rotate-3">
              B
            </div>
            <span class="font-bold text-slate-800 text-lg tracking-tight">Buddy<span class="text-indigo-600">2Learn</span></span>
          </div>
          
          <div class="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 max-w-md mx-auto w-full p-4 pb-24 relative z-10">
        <router-outlet></router-outlet>
      </main>

      <!-- Bottom Navigation -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe z-50">
        <div class="max-w-md mx-auto flex justify-around items-center h-16">
          <a routerLink="/dashboard" routerLinkActive="text-indigo-600 scale-110" [routerLinkActiveOptions]="{exact: true}" class="flex flex-col items-center gap-1 text-slate-400 transition-all duration-200 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="text-[10px] font-semibold">Home</span>
          </a>
          
          <a routerLink="/chat" routerLinkActive="text-pink-500 scale-110" class="flex flex-col items-center gap-1 text-slate-400 transition-all duration-200 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            <span class="text-[10px] font-semibold">Ask Buddy</span>
          </a>
          
          <a routerLink="/papers" routerLinkActive="text-teal-600 scale-110" class="flex flex-col items-center gap-1 text-slate-400 transition-all duration-200 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            <span class="text-[10px] font-semibold">Papers</span>
          </a>

          <a routerLink="/planner" routerLinkActive="text-amber-500 scale-110" class="flex flex-col items-center gap-1 text-slate-400 transition-all duration-200 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
            <span class="text-[10px] font-semibold">Plan</span>
          </a>
        </div>
      </nav>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
