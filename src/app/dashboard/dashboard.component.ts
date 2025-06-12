import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
})
export class DashboardComponent {

  isSidebarOpen: boolean = false;
  isDarkMode: boolean = false;
  rows: { code: string; description: string; saleValue: number }[] = [];
  newCode: string = '';
  newSaleValue: number | null = null;
  productInfo: any = null;
  constructor(private router: Router) {}
  
  

  // Dados temporários do JSON
  private jsonData = [
    {
      Código: "02T301211D",
      Descrição: "Tampa de Caixa de Câmbio VW 02T301211D",
      Imagem: "https://dvo56mb5swza6.cloudfront.net/300x300/44349/upload/02T-301-211-D_1.jpg",
      PreçoPúblico: 100
    },
    {
      Código: "8L4867276",
      Descrição: "Clip VW 8L4867276",
      Imagem: "https://dvo56mb5swza6.cloudfront.net/300x300/14805/upload/8L4-867-27601.jpg",
      PreçoPúblico: 200
    }
  ];

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  addRow(): void {
    if (this.newCode && this.newSaleValue !== null) {
      this.rows.push({
        code: this.newCode,
        description: 'Produto Padrão',
        saleValue: this.newSaleValue,
      });
      this.newCode = '';
      this.newSaleValue = null;
    }
  }

  async getProductData(code: string): Promise<any> {
    // Usando os dados locais em vez de buscar JSON externo
    console.log('Dados carregados localmente:', this.jsonData);

    const product = this.jsonData.find((item: any) => item.Código === code);
    console.log('Produto encontrado:', product);

    return product || null;
  }

  async searchProduct(): Promise<void> {
    if (this.newCode) {
      this.productInfo = await this.getProductData(this.newCode);

      if (this.productInfo) {
        console.log('Produto encontrado:', this.productInfo);
      } else {
        console.log('Produto não encontrado!');
      }
    }
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }

  logout(): void {
    console.log('Logout realizado!');
    this.router.navigate(['/']); // Redireciona para a página inicial (ou login)
  }
}