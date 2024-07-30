import { Injectable } from '@angular/core';
import axios from 'axios';
import Sweet from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = 'https://auth-clients-backend.vercel.app';

  constructor() {}

  async getClients() {
    try {
      const response = await axios.get(`${this.apiUrl}/client`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getClientsById(id: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/client/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createClient(data: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/client`, data);
      Sweet.fire('Sucesso', 'Cliente criado com sucesso', 'success');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteClient(id: string) {
    const result = await Sweet.fire({
      title: 'Atenção',
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
        Sweet.fire('Sucesso', 'Item excluido com sucesso', 'success');
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    
  }
}
