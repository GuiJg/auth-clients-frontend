import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NzTableModule } from 'ng-zorro-antd/table';
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
      await axios.post(`${this.apiUrl}/client`, data);
      Sweet.fire('Sucesso', 'Cliente criado com sucesso', 'success');
      this.getClients();
    } catch (error) {
      Sweet.fire('Erro', 'Erro ao criar cliente', 'error');
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
        await axios.delete(`${this.apiUrl}/client/${id}`);
        Sweet.fire('Sucesso', 'Cliente excluído com sucesso', 'success');
        this.getClients();
      } catch (error) {
        Sweet.fire('Erro', 'Erro ao excluir cliente', 'error');
        console.error(error);
      }
    }
  }
}
