import { api } from './api';
import { Country } from '../types';

export const countriesService = {
  async getAll(): Promise<Country[]> {
    const response = await api.get('/paises');
    return response.data;
  },

  async getById(id: number): Promise<Country> {
    const response = await api.get(`/paises/${id}`);
    return response.data;
  },

  async getByContinent(continentId: number): Promise<Country[]> {
    const response = await api.get(`/paises/continente/${continentId}`);
    return response.data;
  },

  async create(data: { 
    nome: string; 
    populacao: number; 
    idioma_ofc: string; 
    moeda: string; 
    id_continente: number;
  }): Promise<Country> {
    const response = await api.post('/paises', data);
    return response.data;
  },

  async update(id: number, data: { 
    nome: string; 
    populacao: number; 
    idioma_ofc: string; 
    moeda: string; 
    id_continente: number;
  }): Promise<Country> {
    const response = await api.put(`/paises/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/paises/${id}`);
  },

  async getCountryInfo(id: number): Promise<any> {
    const response = await api.get(`/paises/${id}/info`);
    return response.data;
  },

  async getCountryInfoByName(nome: string): Promise<any> {
    const response = await api.get(`/paises/info/nome/${encodeURIComponent(nome)}`);
    return response.data;
  },
};