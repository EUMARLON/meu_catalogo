import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
})
export class SettingsComponent implements OnInit {
  selectedSetting: 'cadastroDeItens' | 'outraConfig' | 'personalizacaoCatalogo' | null = null;
  productList: Product[] = [];
  newProduct: Product = {
    codigo: '',
    segmento: '',
    descricaoVendas: '',
    descricaoClientes: '',
    imagem: '',
    aplicacao: '',
    precoPublico: 0,
  };
  isEditing: boolean = false;

  configCatalog = {
    textColor: '#000000',
    bgColor: '#ffffff',
    codeColor: '#ff5733',
    descriptionColor: '#1a73e8',
    salePriceColor: '#4caf50',
    discountColor: '#ff0000',
    cardShadowColor: 'rgba(0, 0, 0, 0.2)',
    bgGradientStart: '#ffffff',
    bgGradientEnd: '#cccccc',
    bgGradientDirection: 'to right',
    bannerImage: '', // 🔹 Novo: imagem do banner carregada pelo cliente
    footerText: 'Texto padrão do rodapé', // 🔹 Novo: texto do rodapé personalizado
    cardBorderColor: '#000000', // 🔹 Cor padrão da borda


  };
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productList = this.productService.getProducts();
  
    // 🔹 Carregar tema salvo
    const savedTheme = localStorage.getItem("theme") || "light";
    const container = document.querySelector(".container");
  
    if (savedTheme === "dark") {
      container?.classList.add("dark-mode");
    } else {
      container?.classList.add("light-mode");
    }
  
    // 🔹 Carregar configurações do catálogo
    const savedCatalogConfig = localStorage.getItem('catalogConfig');
    if (savedCatalogConfig) {
      this.configCatalog = JSON.parse(savedCatalogConfig);
    }
  }
  
  // 🔹 Método para carregar imagem do banner
  uploadBanner(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.configCatalog.bannerImage = e.target.result;
        localStorage.setItem('catalogConfig', JSON.stringify(this.configCatalog)); // Salvar a imagem no localStorage
      };
      reader.readAsDataURL(file);
    }
  }

  openColorPicker(colorId: string): void {
    const colorInput = document.getElementById(`${colorId}Picker`) as HTMLInputElement;
    if (colorInput) {
      colorInput.click(); // 🔹 Aciona o seletor de cor do navegador
    }
  }
  
  updateColor(colorType: keyof typeof this.configCatalog, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.configCatalog[colorType] = input.value;
  }
  
  saveCatalogConfig(): void {
    localStorage.setItem('catalogConfig', JSON.stringify(this.configCatalog));
    alert("Configuração do catálogo salva!");
  }

  toggleDarkMode(): void {
    const container = document.querySelector(".container");
    const isDarkMode = container?.classList.contains("dark-mode");

    if (isDarkMode) {
      container?.classList.remove("dark-mode");
      container?.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      container?.classList.remove("light-mode");
      container?.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  }

  onCodeInput(): void {
    const existingProduct = this.productService.getProductByCode(this.newProduct.codigo);

    if (existingProduct) {
      this.newProduct = { ...existingProduct }; 
      this.isEditing = true; 
    } else {
      this.isEditing = false;
    }
  }

  addOrUpdateProduct(): void {
    if (!this.newProduct.codigo || !this.newProduct.descricaoVendas) {
      alert('Preencha os campos obrigatórios!');
      return;
    }
  
    if (this.isEditing) {
      this.productService.updateProduct(this.newProduct); 
    } else {
      this.productService.addProduct({ ...this.newProduct });
    }
  
    this.productList = this.productService.getProducts();
    alert(this.isEditing ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
    this.closeSetting();
  }

  openSetting(setting: 'cadastroDeItens' | 'outraConfig' | 'personalizacaoCatalogo'): void {
    this.selectedSetting = setting;
  }

  closeSetting(): void {
    this.selectedSetting = null;
    this.isEditing = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newProduct = {
      codigo: '',
      segmento: '',
      descricaoVendas: '',
      descricaoClientes: '',
      imagem: '',
      aplicacao: '',
      precoPublico: 0,
    };
  }
}