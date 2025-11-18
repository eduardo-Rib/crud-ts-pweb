import { api } from './api';
import { City } from '../types';

export const citiesService = {
  async getAll(): Promise<City[]> {
    const response = await api.get('/cidades');
    return response.data;
  },

  async getById(id: number): Promise<City> {
    const response = await api.get(`/cidades/${id}`);
    return response.data;
  },

  async getByCountry(countryId: number): Promise<City[]> {
    const response = await api.get(`/cidades/pais/${countryId}`);
    return response.data;
  },

  async getByContinent(continentId: number): Promise<City[]> {
    const response = await api.get(`/cidades/continente/${continentId}`);
    return response.data;
  },

  async create(data: { 
    nome: string; 
    populacao: number; 
    latitude: string; 
    longitude: string; 
    id_pais: number;
  }): Promise<City> {
    const response = await api.post('/cidades', data);
    return response.data;
  },

  async update(id: number, data: { 
    nome: string; 
    populacao: number; 
    latitude: string; 
    longitude: string; 
    id_pais: number;
  }): Promise<City> {
    const response = await api.put(`/cidades/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/cidades/${id}`);
  },

  async getWeather(id: number): Promise<any> {
    const response = await api.get(`/cidades/${id}/clima`);
    return response.data;
  },
};