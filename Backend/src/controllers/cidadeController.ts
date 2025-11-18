import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getWeather } from '../services/apiService';

const prisma = new PrismaClient();

export const getCidades = async (req: Request, res: Response) => {
  try {
    const cidades = await prisma.cidade.findMany({
      include: { pais: { include: { continente: true } } },
    });
    res.json(cidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cidades.' });
  }
};

export const getCidade = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cidade = await prisma.cidade.findUnique({
      where: { id: Number(id) },
      include: { pais: { include: { continente: true } } },
    });
    if (cidade) {
      res.json(cidade);
    } else {
      res.status(404).json({ error: 'Cidade não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cidade.' });
  }
};

export const createCidade = async (req: Request, res: Response) => {
  const { nome, populacao, latitude, longitude, id_pais } = req.body;
  try {
    const cidade = await prisma.cidade.create({
      data: { nome, populacao, latitude, longitude, id_pais: Number(id_pais) },
    });
    res.status(201).json(cidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cidade.' });
  }
};

export const updateCidade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, populacao, latitude, longitude, id_pais } = req.body;
  try {
    const cidade = await prisma.cidade.update({
      where: { id: Number(id) },
      data: { nome, populacao, latitude, longitude, id_pais: Number(id_pais) },
    });
    res.json(cidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cidade.' });
  }
};

export const deleteCidade = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.cidade.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cidade.' });
  }
};

export const getCidadesPorPais = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cidades = await prisma.cidade.findMany({
      where: { id_pais: Number(id) },
      include: { pais: { include: { continente: true } } },
    });
    res.json(cidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cidades por país.' });
  }
};

export const getCidadesPorContinente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cidades = await prisma.cidade.findMany({
      where: { pais: { id_continente: Number(id) } },
      include: { pais: { include: { continente: true } } },
    });
    res.json(cidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cidades por continente.' });
  }
};

export const getCidadeClima = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  console.log(`Buscando clima para cidade ID: ${id}`);
  
  try {
    const cidade = await prisma.cidade.findUnique({
      where: { id: Number(id) },
      include: { 
        pais: {
          include: { continente: true }
        } 
      },
    });
    
    if (!cidade) {
      console.log('Cidade não encontrada');
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }

    console.log(`Dados da cidade: ${cidade.nome}, País: ${cidade.pais?.nome}, Coordenadas: ${cidade.latitude}, ${cidade.longitude}`);
    
    const clima = await getWeather(
      cidade.latitude, 
      cidade.longitude, 
      cidade.nome, 
      cidade.pais?.nome
    );
    
    console.log('Clima encontrado:', clima);
    res.json(clima);
    
  } catch (error: any) {
    console.error('Erro ao buscar clima da cidade:', error);
    res.status(500).json({ 
      error: error.message || 'Erro interno ao buscar dados meteorológicos.' 
    });
  }
};