// @ts-ignore
import interact from 'interactjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { StateService } from '../services/state.service'; // Importa o serviço
import { HttpClient } from '@angular/common/http';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
declare const interact: any; // ✅ Adicione logo abaixo das importações
  
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class UserPanelComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isDarkMode: boolean = false;
  rows: { code: string; description: string; saleValue: number; price: number; image: string }[] = [];
  newCode: string = '';
  newSaleValue: number | null = null;
  productInfo: Product | null = null;
  productList: Product[] = [];
  newAverageCost: number | null = null;
  newBasePISCOFINS: number | null = null;
  
  

  // 🔹 Adicionando configuração do catálogo
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
    bannerImage: '', // 🔹 Novo: imagem do banner
    footerText: 'Texto padrão do rodapé' // 🔹 Novo: texto do rodapé
    
  };

  

  constructor(
    private router: Router,
    private productService: ProductService,
    private stateService: StateService,
    private http: HttpClient
  ) {}

    // 🔹 Função para remover um item do table container
    removerDoTableContainer(codigoProduto: string) {
      const linhaTabela = document.querySelector(`#tableContainer tr[data-codigo="${codigoProduto}"]`);
      if (linhaTabela) {
        linhaTabela.remove();
      }
    }
  
  
  

  



  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.productList = this.productService.getProducts();
    this.rows = this.stateService.getRows();

    // 🔹 Carregar configurações do catálogo salvas no localStorage
    const savedCatalogConfig = localStorage.getItem('catalogConfig');
    if (savedCatalogConfig) {
      this.configCatalog = JSON.parse(savedCatalogConfig);
    }
    interact('.draggable').draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        start(event: Interact.InteractEvent) {

          console.log('Arraste iniciado', event);
        },
        move(event: Interact.InteractEvent) {

          const target = event.target as HTMLElement;
          if (target) {
            const x = (parseFloat(target.getAttribute('data-x') || '0')) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y') || '0')) + event.dy;
    
            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());
          }
        },
        end(event: Interact.InteractEvent) {

          console.log('Arraste finalizado', event);
        }
      }
    });

    interact('.resizable').resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event: PointerEvent & { dx?: number; dy?: number }) {
          const target = event.target as HTMLElement;
          if (target) {
            let { width, height } = (event as any).rect;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
          }
        }
      }
    });

    // Carrega html2pdf.js dinamicamente
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('html2pdf.js carregado corretamente!');

      // Adiciona evento ao botão apenas após o script carregar
      const btnDownloadPDF = document.getElementById('downloadCatalog');
      if (btnDownloadPDF) {
        btnDownloadPDF.addEventListener('click', () => {
          console.log('Botão de baixar PDF foi clicado!');
          this.downloadCatalog();
        });
      } else {
        console.error("Erro: Botão 'Baixar Catálogo (PDF)' não encontrado!");
      }
    };

    script.onerror = () => {
      console.error('Erro ao carregar html2pdf.js');
    };
}

// 🔹 Método para carregar imagem do banner
uploadBanner(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.configCatalog.bannerImage = e.target.result;
            localStorage.setItem('catalogConfig', JSON.stringify(this.configCatalog)); // Salvar no localStorage
        };
        reader.readAsDataURL(file);
    }
}

  
  

  // Método que gera e abre o catálogo em uma nova janela com os estilos inline
  generateCatalog(): void {
    const toggleButton = document.getElementById("toggleCatalog");
    const catalogContainer = document.getElementById("catalog-display");
  
    if (!toggleButton || !catalogContainer) {
      console.error("Elementos não encontrados!");
      return;
    }
  
    if (catalogContainer.innerHTML === "") {
      toggleButton.textContent = "Ocultar Catálogo";
  
      this.http.get('assets/catalogo.html', { responseType: 'text' }).subscribe(
        (htmlTemplate) => {
          this.http.get('assets/catalogo.css', { responseType: 'text' }).subscribe(
            (cssContent) => {
              const baseURL = window.location.origin + "/assets/images/";
  
              const savedCatalogConfig = localStorage.getItem('catalogConfig');
              const catalogSettings = savedCatalogConfig ? JSON.parse(savedCatalogConfig) : { 
                textColor: '#000000',
                bgColor: '#ffffff',
                codeColor: '#ff5733',
                descriptionColor: '#1a73e8',
                salePriceColor: '#4caf50',
                discountColor: '#ff0000',
                cardShadowColor: 'rgba(0, 0, 0, 0.2)',
                bgGradientStart: '#ffffff',
                bgGradientEnd: '#cccccc',
                bgGradientDirection: 'to right'
              };
  
              let modifiedTemplate = htmlTemplate.replace('<base href="/">', `<base href="${window.location.origin}/">`);
              modifiedTemplate = modifiedTemplate.replace(/<link rel="stylesheet".*catalogo\.css".*>/g, '');
  
              const styleTag = `<style>
              .catalogo {
                width: 300mm; /* 🔹 Largura do A3 */
                min-height: 420mm; /* 🔹 Altura do A3 */
                position: relative;
                margin: 0 auto;
                display: block;
                background: linear-gradient(${catalogSettings.bgGradientDirection}, ${catalogSettings.bgGradientStart}, ${catalogSettings.bgGradientEnd}) !important;
              }
                .grid-container {
                  display: grid;
                  gap: 12px 12px;
                  width: 90%;
                  margin: auto;
                  padding: 22px;
                  min-height: 80%;
                  justify-content: center;


                }
                
                
                
                .grid-first-page {
                  grid-template-columns: repeat(4, minmax(250px, 1fr));
                  grid-template-rows: repeat(3, 350px); /* 🔹 Ajusta altura mínima e permite expansão */
                }
                
                .grid-next-pages {
                  grid-template-columns: repeat(4, minmax(250px, 1fr));
                  grid-template-rows: repeat(4, 280px); /* 🔹 Mantém altura mínima adequada */
                }
                .banner {
                  width: 100%;
                  height: 20%;
                  text-align: center;
                }
                .banner img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
                
                .rodape {
                  width: 100%;
                  height: 07%;
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  background-color: #f1f1f1;
                  text-align: center;
                  font-size: 18px;
                  
                }
                .rodape p {
                  margin: 20px 20px; /* 🔹 Adiciona margem superior e inferior */
                }
                
                .produto {
                  border-radius: 12px;
                  padding: 15px;
                  border: 2px solid ${catalogSettings.cardBorderColor}; /* 🔹 Agora usa a cor configurável */
                  text-align: center;
                  background: #fff;
                  width: auto;
                  min-width: 250px;
                  min-height: 350px;
                  max-height: 800px;
                  max-width: 800px;
                  margin: auto;
                  box-sizing: border-box;
                  z-index: 9999 !important;
                  position: relative !important; /* 🔹 Mantém cada produto fixo dentro do grid */
                  grid-column: span 1; /* 🔹 Garante que cada produto ocupe apenas uma célula */
                  grid-row: span 1; /* 🔹 Mantém a altura fixa dentro do grid */
                
                



                }
                .codigo { color: ${catalogSettings.codeColor}; font-weight: bold; }
                .descricao-clientes { color: ${catalogSettings.descriptionColor}; }
                .preco-venda { color: ${catalogSettings.salePriceColor}; font-weight: bold; }
                .desconto { color: ${catalogSettings.discountColor}; font-weight: bold; }
              </style>`;
              modifiedTemplate = modifiedTemplate.replace('</head>', styleTag + '</head>');
  
              // 🔹 Obtendo lista de produtos e dividindo em páginas
              const produtos = this.rows.map(row => this.getProductData(row.code)).filter(product => product);
              const paginas: Product[][] = [];
              let paginaAtual: Product[] = [];
  
              produtos.forEach((produto) => {
                if (produto !== null) { // 🔹 Garante que o produto não é nulo antes de adicionar
                  const limitePagina = paginas.length === 0 ? 12 : 16;
              
                  if (paginaAtual.length < limitePagina) {
                    paginaAtual.push(produto);
                  } else {
                    paginas.push([...paginaAtual]);
                    paginaAtual = [produto]; // 🔹 Aqui garantimos que `produto` nunca será null
                  }
                }
              });
  
              if (paginaAtual.length > 0) {
                paginas.push([...paginaAtual]);
              }
  
              // 🔹 Gerando HTML das páginas
              const paginasHTML = paginas.map((pagina, i) => {
                const gridClass = i === 0 ? "grid-first-page" : "grid-next-pages";
                const bannerHTML = i === 0 && this.configCatalog.bannerImage 
                  ? `<div class="banner"><img src="${this.configCatalog.bannerImage}" alt="Banner"></div>` 
                  : '';
                const rodapeHTML = `<div class="rodape"><p>${this.configCatalog.footerText}</p></div>`;
              
                return `
                  <div class="catalogo">
                    ${bannerHTML}
                    <div class="grid-container ${gridClass}">
                      ${pagina.map((product, index) => {
                        const row = this.rows[index]; // 🔹 Corrige a referência para acessar `saleValue`
                        if (!row) return ''; // Evita erros se `row` não existir
              
                        const discount = product.precoPublico > row.saleValue 
                          ? Math.round(((product.precoPublico - row.saleValue) / product.precoPublico) * 100) 
                          : 0;
              
                          return `
                          <div class="produto draggable resizable" data-id="${product.codigo}">
                            <p class="codigo"><strong>${product.codigo}</strong></p>
                            <div class="desconto">Desconto ${discount}%</div>
                            <p class="descricao-clientes"><strong>${product.descricaoClientes}</strong></p>
                            <img src="https://stackblitzstarters6pngtnjl-cncl--4200--55edb8f4.local-corp.webcontainer.io/assets/images/${product.codigo}.jpg" 
                                 alt="${product.descricaoVendas}">
                            <div class="info">
                              <p class="segmento"><strong>Segmento:</strong> ${product.segmento}</p>
                              <p class="aplicacao"><strong>Aplicação:</strong> ${product.aplicacao}</p>
                              <div class="precos">
                                <p class="preco-publico">De: R$ ${product.precoPublico.toFixed(2)}</p>
                                <p class="preco-venda">Para: R$ ${row.saleValue.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>`;
                      }).join("")}
                    </div>
                    ${rodapeHTML}
                  </div>
                `;
              }).join("");
  
              // 🔹 Inserindo o catálogo na tela
              const catalogFinalHTML = modifiedTemplate.replace('%%PRODUTOS%%', paginasHTML);
              const blob = new Blob([catalogFinalHTML], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              
              console.log('Criando iframe com URL:', url);
              
              catalogContainer.innerHTML = `<iframe id="catalogIframe" src="${url}" style="width:100%; height:100vh; border:none;"></iframe>`;
              console.log("Iframe foi inserido!", document.getElementById('catalogIframe'));
              
              // 🔹 Esperar o iframe carregar antes de aplicar Interact.js
              const iframe = document.getElementById('catalogIframe') as HTMLIFrameElement;
              
              iframe.onload = () => {
                const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
              
                if (iframeDocument) {
                  console.log("Iframe carregado corretamente!");

                      // 🔹 Adicionar a classe `.resize-drag` aos produtos automaticamente
                      iframeDocument.querySelectorAll('.produto').forEach(el => {
                        el.classList.add('resize-drag'); 
                      
                        el.addEventListener('click', () => {
                          iframeDocument.querySelectorAll('.produto').forEach(p => p.classList.remove('selecionado'));
                          el.classList.add('selecionado'); // 🔹 Destaca o item selecionado
                        });
                      });


                       // 🔹 Remover do catalogo ao pressionar delete

                       iframeDocument.addEventListener('keydown', (event) => {
                        if (event.key === "Delete") {
                          const itemSelecionado = iframeDocument.querySelector('.produto.selecionado');
                      
                          if (itemSelecionado) {
                            const codigoProduto = (itemSelecionado.querySelector('.codigo strong') as HTMLElement)?.innerText;
                            const index = this.rows.findIndex(row => row.code === codigoProduto);
                      
                            if (index !== -1) {
                              this.removeRow(index); // 🔹 Remove da tabela
                            }
                      
                            itemSelecionado.remove(); // 🔹 Remove da visualização
                          }
                        }
                      });


              
                  // 🔹 Injetando Interact.js diretamente no iframe
                  const script = iframeDocument.createElement('script');
                  script.src = "https://unpkg.com/interactjs/dist/interact.min.js";
                  script.onload = () => {
                    console.log("Interact.js carregado dentro do iframe!");
              
                    // 🔹 Agora inicializamos Grid-Snap e Resize
                    const interactScript = iframeDocument.createElement('script');
                    interactScript.innerHTML = `
                      setTimeout(() => {
                        console.log("🚀 Interact.js está sendo ativado com Snap + Resize!");
              
                        interact('.produto.resize-drag')
                          .draggable({
                            inertia: true,
                            autoScroll: true,
                            modifiers: [
                              interact.modifiers.snap({
                                targets: [
                                  interact.snappers.grid({ x: 11, y: 11 }) // 🔹 Ajusta a grade para 50x50 pixels
                                ],
                                range: Infinity,
                                relativePoints: [{ x: 0, y: 0 }]
                              })
                            ],
                            listeners: {
                              move(event) {
                                console.log('Evento move ativado dentro do iframe!', event);
                                const target = event.target;
                                if (target) {
                                  const x = (parseFloat(target.getAttribute('data-x') || '0')) + event.dx;
                                  const y = (parseFloat(target.getAttribute('data-y') || '0')) + event.dy;
                                  target.style.transform = \`translate(\${x}px, \${y}px)\`;
                                  target.setAttribute('data-x', x.toString());
                                  target.setAttribute('data-y', y.toString());
                                }
                              }
                            }
                          })
                          .resizable({
                            edges: { left: true, right: true, top: true, bottom: true },
                            preserveAspectRatio: false, // 🔹 Permite ajuste livre sem empurrar outros produtos
                            inertia: true,
                        
                            listeners: {
                              move(event) {
                                console.log("Resize ativado dentro do iframe!", event);
                        
                                let target = event.target;
                                let x = parseFloat(target.getAttribute('data-x') || '0');
                                let y = parseFloat(target.getAttribute('data-y') || '0');
                        
                                // 🔹 Define tamanho apenas do item redimensionado
                                target.style.width = event.rect.width + "px";
                                target.style.height = event.rect.height + "px";
                        
                                // 🔹 Mantém a posição fixa para evitar que os outros itens se movam
                                target.style.transform = "translate(" + x + "px, " + y + "px)";
                              }
                            }
                          });
                        
                        
                      }, 1000); // 🔹 Aguarda 2 segundos para garantir que o  está carregado
                    `;
                    iframeDocument.body.appendChild(interactScript);
                  };
              
                  iframeDocument.body.appendChild(script);
                }
              };
            },
            (error) => {
              console.error('Erro ao carregar o CSS:', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao carregar o template HTML:', error);
        }
      );
    } else {
      catalogContainer.innerHTML = "";
      toggleButton.textContent = "Mostrar Catálogo";
    }
  }
  
  




  // Método para baixar o catálogo como PDF no formato A3
  downloadCatalog(): void {
    console.log('downloadCatalog() foi chamado.');
  
    const element = document.querySelector('#catalogContainer .a3-container') as HTMLElement;
    const menuSuperior = document.getElementById('menu-superior'); // Pegando o menu superior
  
    if (!element) {
      alert('O catálogo ainda não foi gerado ou não está disponível para download!');
      return;
    }
  
    // Esconde temporariamente o menu antes de capturar o PDF
    if (menuSuperior) {
      menuSuperior.style.display = 'none';
    }
  
    // Captura todas as imagens dentro do catálogo
    const images = element.querySelectorAll('img');
  
    if (images.length === 0) {
      console.log('Nenhuma imagem detectada, gerando PDF imediatamente.');
      this.gerarPDF(element, menuSuperior);
      return;
    }
  
    let loadedImages = 0;
    
    images.forEach(img => {
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          console.log('Todas as imagens carregadas. Gerando PDF...');
          this.gerarPDF(element, menuSuperior);
        }
      };
  
      img.onerror = () => {
        console.warn('Erro ao carregar imagem:', img.src);
        loadedImages++;
        if (loadedImages === images.length) {
          this.gerarPDF(element, menuSuperior);
        }
      };
    });
  }
  
  
  // Método auxiliar para gerar o PDF
  gerarPDF(element: HTMLElement, menuSuperior: HTMLElement | null): void {
    console.log('Gerando PDF...');

    // Garantir que todas as imagens carreguem antes de capturar
    const images = element.querySelectorAll('img');
    let loadedImages = 0;

    if (images.length === 0) {
        console.log('Nenhuma imagem encontrada, gerando PDF imediatamente.');
        this.processarPDF(element, menuSuperior);
        return;
    }

    images.forEach(img => {
        img.onload = () => {
            loadedImages++;
            if (loadedImages === images.length) {
                console.log('Todas as imagens carregadas. Gerando PDF...');
                this.processarPDF(element, menuSuperior);
            }
        };

        img.onerror = () => {
            console.warn('Erro ao carregar imagem:', img.src);
            loadedImages++;
            if (loadedImages === images.length) {
                this.processarPDF(element, menuSuperior);
            }
        };
    });
}





processarPDF(element: HTMLElement, menuSuperior: HTMLElement | null): void {
  console.log('Convertendo para PDF...');

  html2canvas(element, { scale: 2, useCORS: true, allowTaint: false, imageTimeout: 10000 }).then((canvas: HTMLCanvasElement) => {
      console.log('Canvas gerado com sucesso!');

      canvas.toBlob((blob: Blob | null) => {
          if (!blob) {
              console.error('Erro ao gerar Blob da imagem.');
              return;
          }

          const url = URL.createObjectURL(blob);

          const opt = {
              margin: 100,
              filename: 'catalogo2222.pdf',
              image: { type: 'jpeg', quality: 1 },
              jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
              pagebreak: { mode: 'avoid-all' }
          };

          const tempImg = document.createElement("img");
          tempImg.src = url;

          tempImg.onload = () => {
              console.log("Imagem carregada para PDF, iniciando conversão...");
              html2pdf().set(opt).from(tempImg).save().then(() => {
                  console.log("PDF gerado com sucesso!");
                  if (menuSuperior) {
                      menuSuperior.style.display = 'block';
                  }
              }).catch((error: any) => {
                  console.error("Erro ao gerar PDF:", error);
              });
          };
      }, "image/jpeg");
  }).catch((error: any) => {
      console.error("Erro ao capturar o catálogo:", error);
  });
}
  
downloadImage(): void {
  console.log('downloadImage() foi chamado.');

  const element = document.querySelector('#catalogContainer .a3-container') as HTMLElement;
  if (!element) {
      alert('O catálogo ainda não foi gerado ou não está disponível para download!');
      return;
  }

  html2canvas(element, { scale: 2, useCORS: true, allowTaint: false }).then((canvas: HTMLCanvasElement) => {
      console.log('Canvas gerado com sucesso!');

      // Usa toBlob() para evitar bloqueios de CORS
      canvas.toBlob(blob => {
          if (!blob) {
              console.error('Erro ao gerar Blob da imagem.');
              return;
          }

          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'catalogo.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          console.log('Imagem baixada com sucesso!');
      }, 'image/png');
  }).catch((error: any) => {
      console.error('Erro ao gerar imagem:', error);
  });
}

  calculateFinalCost(): number {
    const saleValue = this.newSaleValue ?? 0;
    const averageCost = this.newAverageCost ?? 0;
    const basePISCOFINS = this.newBasePISCOFINS ?? 0;
  
    return basePISCOFINS > 1
      ? (saleValue * 0.0925) + averageCost
      : averageCost;
  }

  calculateProfitability(): number {
    const finalCost = this.calculateFinalCost();
    if (!this.newSaleValue || finalCost === 0) {
      return 0;
    }
  
    return ((this.newSaleValue - finalCost) / this.newSaleValue) * 100;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  addRow(): void {
    if (!this.productInfo || this.newSaleValue === null) {
      alert('Nenhum produto encontrado ou valor de venda não inserido.');
      return;
    }
  
    const alreadyExists = this.rows.some(row => row.code === this.productInfo?.codigo);
    if (alreadyExists) {
      alert('Este produto já foi adicionado!');
      return;
    }
  
    this.rows.push({
      code: this.productInfo.codigo!,
      description: this.productInfo.descricaoVendas!,
      saleValue: this.newSaleValue,
      price: this.productInfo.precoPublico!,
      image: this.productInfo.imagem!
    });
  
    this.stateService.setRows(this.rows);
    this.closeModal();
    this.newSaleValue = null;
  }

  getProductData(code: string): Product | null {
    return this.productService.getProducts().find(item => item.codigo === code) || null;
  }

  getDiscountPercentage(row: any): string {
    if (!row.price || row.saleValue === null) return '0%';
    return `${Math.abs(((row.saleValue / row.price) - 1) * 100).toFixed(2)}%`;
  }

  searchProduct(): void {
    if (!this.newCode) return;
    this.productInfo = this.getProductData(this.newCode);
    if (!this.productInfo) {
      alert('Produto não encontrado!');
    }
  }
  
  closeModal(): void {
    this.productInfo = null;
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }

  logout(): void {
    console.log('Logout realizado!');
    this.router.navigate(['/']);
  }

  



  saveState(): void {
    sessionStorage.setItem('savedRows', JSON.stringify(this.rows));
  }
  


  
}