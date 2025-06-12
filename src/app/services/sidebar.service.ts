import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isSidebarOpen = true; // Define o estado inicial da sidebar

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; // Alterna entre aberto e fechado
  }
}