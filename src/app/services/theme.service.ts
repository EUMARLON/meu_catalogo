import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = 'light'; // Tema padrão

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme); // Aplica no <body> para CSS global
  }

  getTheme(): string {
    return this.currentTheme;
  }
}