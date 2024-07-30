import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import Sweet from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private apiUrl = 'https://auth-clients-backend.vercel.app';
  listOfData: any[] = []; 

  constructor(private toastr: ToastrService) {} 

  ngOnInit() {
    this.getClients();
  }

  async getClients() {
    try {
      const response = await axios.get(`${this.apiUrl}/client`);
      this.listOfData = response.data; 
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  }

  async createClient(data: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/client`, data);
      this.toastr.success('Cliente criado com sucesso!', 'Sucesso');
      this.getClients();
    } catch (error) {
      this.toastr.error('Erro ao criar cliente.', 'Erro');
      console.error(error);
    }
  }

  async deleteItem(id: string) {
    const result = await Sweet.fire({
      title: 'Atenção',
      text: 'Tem certeza que deseja excluir o item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${this.apiUrl}/client/${id}`);
        this.toastr.success('Cliente deletado com sucesso!', 'Sucesso');
        this.getClients();
      } catch (error) {
        this.toastr.error('Erro ao deletar cliente.', 'Erro');
        console.error(error);
      }
    }
  }
}
