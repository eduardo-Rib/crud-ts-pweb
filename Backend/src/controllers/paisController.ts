import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getCountryInfo } from '../services/apiService';

const prisma = new PrismaClient();

export const getPaises = async (req: Request, res: Response) => {
  try {
    const paises = await prisma.pais.findMany({
      include: { continente: true },
    });
    res.json(paises);
  } catch (error) {
    console.error('Erro ao buscar países:', error);
    res.status(500).json({ error: 'Erro ao buscar países.' });
  }
};

export const getPais = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pais = await prisma.pais.findUnique({
      where: { id: Number(id) },
      include: { continente: true },
    });
    if (pais) {
      res.json(pais);
    } else {
      res.status(404).json({ error: 'País não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar país:', error);
    res.status(500).json({ error: 'Erro ao buscar país.' });
  }
};

export const createPais = async (req: Request, res: Response) => {
  const { nome, populacao, idioma_ofc, moeda, id_continente } = req.body;
  
  console.log('Dados recebidos para criar país:', { nome, populacao, idioma_ofc, moeda, id_continente });

  // Validações
  if (!nome || !populacao || !idioma_ofc || !moeda || !id_continente) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  if (typeof populacao !== 'number' || populacao < 0) {
    return res.status(400).json({ error: 'População deve ser um número positivo.' });
  }

  try {
    const pais = await prisma.pais.create({
      data: { 
        nome: nome.toString().trim(),
        populacao: Number(populacao),
        idioma_ofc: idioma_ofc.toString().trim(),
        moeda: moeda.toString().trim(),
        id_continente: Number(id_continente)
      },
    });
    
    console.log('País criado com sucesso:', pais);
    res.status(201).json(pais);
  } catch (error: any) {
    console.error('Erro ao criar país:', error);
    
    // Verificar se é erro de chave estrangeira
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Continente não encontrado.' });
    }
    
    res.status(500).json({ error: 'Erro ao criar país.' });
  }
};

export const updatePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, populacao, idioma_ofc, moeda, id_continente } = req.body;
  
  console.log('Dados recebidos para atualizar país:', { id, nome, populacao, idioma_ofc, moeda, id_continente });

  // Validações
  if (!nome || !populacao || !idioma_ofc || !moeda || !id_continente) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  if (typeof populacao !== 'number' || populacao < 0) {
    return res.status(400).json({ error: 'População deve ser um número positivo.' });
  }

  try {
    // Verificar se o país existe
    const paisExistente = await prisma.pais.findUnique({
      where: { id: Number(id) },
    });

    if (!paisExistente) {
      return res.status(404).json({ error: 'País não encontrado.' });
    }

    const pais = await prisma.pais.update({
      where: { id: Number(id) },
      data: { 
        nome: nome.toString().trim(),
        populacao: Number(populacao),
        idioma_ofc: idioma_ofc.toString().trim(),
        moeda: moeda.toString().trim(),
        id_continente: Number(id_continente)
      },
    });
    
    console.log('País atualizado com sucesso:', pais);
    res.json(pais);
  } catch (error: any) {
    console.error('Erro ao atualizar país:', error);
    
    // Verificar se é erro de chave estrangeira
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Continente não encontrado.' });
    }
    
    // Verificar se é erro de registro não encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'País não encontrado.' });
    }
    
    res.status(500).json({ error: 'Erro ao atualizar país.' });
  }
};

export const deletePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Verificar se existem cidades vinculadas
    const cidades = await prisma.cidade.findMany({
      where: { id_pais: Number(id) },
    });
    if (cidades.length > 0) {
      return res.status(400).json({ error: 'Não é possível excluir país com cidades vinculadas.' });
    }

    await prisma.pais.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    console.error('Erro ao excluir país:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'País não encontrado.' });
    }
    
    res.status(500).json({ error: 'Erro ao excluir país.' });
  }
};

export const getPaisesPorContinente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const paises = await prisma.pais.findMany({
      where: { id_continente: Number(id) },
      include: { continente: true },
    });
    res.json(paises);
  } catch (error) {
    console.error('Erro ao buscar países por continente:', error);
    res.status(500).json({ error: 'Erro ao buscar países por continente.' });
  }
};

export const getPaisInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pais = await prisma.pais.findUnique({
      where: { id: Number(id) },
    });
    if (!pais) {
      return res.status(404).json({ error: 'País não encontrado.' });
    }

    const info = await getCountryInfo(pais.nome);
    res.json(info);
  } catch (error: any) {
    console.error('Erro ao buscar informações do país:', error);
    res.status(500).json({ error: error.message || 'Erro ao buscar informações do país.' });
  }
};

export const getPaisInfoByName = async (req: Request, res: Response) => {
  const { nome } = req.params;
  
  console.log(`Buscando informações para o país: ${nome}`);
  
  try {
    const info = await getCountryInfo(nome);
    console.log('Informações encontradas:', info);
    res.json(info);
  } catch (error: any) {
    console.error('Erro ao buscar informações do país:', error);
    res.status(404).json({ 
      error: error.message || 'Não foi possível encontrar informações para este país.' 
    });
  }
};