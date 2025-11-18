import { api } from './api';
import { Continent } from '../types';

export const continentsService = {
  async getAll(): Promise<Continent[]> {
    const response = await api.get('/continentes');
    return response.data;
  },

  async getById(id: number): Promise<Continent> {
    const response = await api.get(`/continentes/${id}`);
    return response.data;
  },

  async create(data: { nome: string; descricao: string }): Promise<Continent> {
    const response = await api.post('/continentes', data);
    return response.data;
  },

  async update(id: number, data: { nome: string; descricao: string }): Promise<Continent> {
    const response = await api.put(`/continentes/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/continentes/${id}`);
  },
};