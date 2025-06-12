
import { Injectable } from '@angular/core';

// Interface para definir a estrutura dos produtos
export interface Product {
  codigo: string;
  segmento: string;
  descricaoVendas: string;
  descricaoClientes: string;
  imagem: string;
  aplicacao: string;
  precoPublico: number;
  categoria?: string; // opcional
  estoque?: number;   // opcional
}


@Injectable({
  providedIn: 'root' // Disponível globalmente no app
})
export class ProductService {
  private productList: Product[] =[
    {
        "codigo": "N10699801",
        "segmento": "REPARO",
        "descricaoVendas": "Parafuso VW N10699801",
        "descricaoClientes": "Parafuso",
        "imagem": "https://cors-anywhere.herokuapp.com/https://dvo56mb5swza6.cloudfront.net/300x300/32508/upload/N-106-998-0101.jpg",
        "aplicacao": "Nivus, Passat, Polo, T-Cross, Tiguan, Virtus",
        "precoPublico": 50
    },
    {
        "codigo": "2H1837016G",
        "segmento": "COLISÃO",
        "descricaoVendas": "Fechadura de Porta VW 2H1837016G",
        "descricaoClientes": "Fechadura de Porta",
        "imagem": "https://dvo56mb5swza6.cloudfront.net/300x300/21142/360/Lv1/2H1-837-016-G01.jpg",
        "aplicacao": "Amarok",
        "precoPublico": 51
    },
    {
        "codigo": "0A5409413D",
        "segmento": "REPARO",
        "descricaoVendas": "-",
        "descricaoClientes": "-",
        "imagem": "/assets/images/0A5409413D.jpg",
        "aplicacao": "-",
        "precoPublico": 51
    },
    {
      "codigo": "2G0853101C041",
      "segmento": "REPARO",
      "descricaoVendas": "-",
      "descricaoClientes": "-",
      "imagem": "/assets/images/2G0853101C041.jpg",
      "aplicacao": "-",
      "precoPublico": 51
  },
  {
    "codigo": "2G0853101C0415",
    "segmento": "REPARO",
    "descricaoVendas": "-",
    "descricaoClientes": "-",
    "imagem": "/assets/images/2G0853101C041.jpg",
    "aplicacao": "-",
    "precoPublico": 51
},
{
  "codigo": "2G0853101C0414",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "2G0853101C0413",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "2G0853101C0412",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "2G0853101C0411",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "1",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "2",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "3",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "4",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "5",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "6",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "7",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "8",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "9",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "10",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "11",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},
{
  "codigo": "12",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},{
  "codigo": "13",
  "segmento": "REPARO",
  "descricaoVendas": "-",
  "descricaoClientes": "-",
  "imagem": "/assets/images/2G0853101C041.jpg",
  "aplicacao": "-",
  "precoPublico": 51
},


    

    

    
    // Adicione mais produtos aqui conforme necessário
  ];
  constructor() {
    this.loadProducts(); // ⚠️ Agora os produtos são carregados ao iniciar a aplicação
  }


  // Retorna toda a lista de produtos
  getProducts(): Product[] {
    return this.productList.map(produto => ({
        ...produto,
        imagem: `/assets/images/${produto.codigo}.jpg` // Monta URL local dinamicamente
    }));
}

  // Busca um produto específico pelo código
  addProduct(newProduct: Product): void {
    this.productList.push(newProduct);
    localStorage.setItem('products', JSON.stringify(this.productList)); // ⚠️ Agora salva no localStorage
  }
  
  private loadProducts(): void {
    const savedProducts = localStorage.getItem('products');
    const storedProducts = savedProducts ? JSON.parse(savedProducts) : [];

    // Mantém os produtos originais e adiciona os que estão no LocalStorage
    this.productList = [...this.productList, ...storedProducts];
}
  getProductByCode(code: string): Product | null {
    return this.productList.find(product => product.codigo === code) || null;

    
  }
  updateProduct(updatedProduct: Product): void {
    const index = this.productList.findIndex(product => product.codigo === updatedProduct.codigo);
    
    if (index !== -1) {
      this.productList[index] = updatedProduct; // Atualiza o produto na lista
      localStorage.setItem('products', JSON.stringify(this.productList)); // Salva no localStorage
    }
  }
  
}




