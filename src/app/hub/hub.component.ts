import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class HubComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isDarkMode: boolean = false;
  rows: { code: string; description: string; saleValue: number }[] = [];
  newCode: string = '';
  newSaleValue: number | null = null;
  productInfo: Product | null = null;
  productList: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.productList = this.productService.getProducts(); // Busca os produtos do serviço
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
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

  getProductData(code: string): Product | null {
    return this.productList.find((item) => item.codigo === code) || null;
  }

  searchProduct(): void {
    if (!this.newCode) return;

    this.productInfo = this.getProductData(this.newCode);
    console.log(this.productInfo ? 'Produto encontrado!' : 'Produto não encontrado!');
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }

  logout(): void {
    console.log('Logout realizado!');
    this.router.navigate(['/']); // Redireciona para a página inicial (ou login)
  }
}