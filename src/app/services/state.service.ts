import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Permite que o serviço seja acessado globalmente
})
export class StateService {
  private rows: any[] = []; // Array para armazenar os dados temporariamente

  // Salva os dados
  setRows(data: any[]): void {
    this.rows = data;
  }

  // Obtém os dados salvos
  getRows(): any[] {
    return this.rows;
  }
}