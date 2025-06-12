import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa o CommonModule para *ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Adiciona CommonModule
  encapsulation: ViewEncapsulation.None // Desativa o encapsulamento
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  keepMeConnected: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.username === 'cliente' && this.password === '1234') {
        alert('Login bem-sucedido! Redirecionando para o hub...');
        this.router.navigate(['/hub/user-panel']);
      } else {
        this.errorMessage = 'Usuário ou senha incorretos!';
      }
      this.isLoading = false;
    }, 1000); // Simula atraso para processamento
  }
}