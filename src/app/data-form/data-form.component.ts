import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule],
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})

export class DataFormComponent {

  dataForm: FormGroup;

  constructor(private fb: FormBuilder, private clientsService: ClientsService, private router: Router) {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  async onSubmit() {
      try {
        const data = this.dataForm.value;
        const result = await this.clientsService.createClient(data);
        console.log('Dados criados com sucesso:', result);
        this.router.navigate(['/clientes']);
      } catch (error) {
        console.error('Erro ao criar dados:', error);
      }
  }
}