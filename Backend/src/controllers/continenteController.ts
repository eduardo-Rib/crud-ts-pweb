import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getContinentes = async (req: Request, res: Response) => {
  try {
    const continentes = await prisma.continente.findMany();
    res.json(continentes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar continentes.' });
  }
};

export const getContinente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const continente = await prisma.continente.findUnique({
      where: { id: Number(id) },
    });
    if (continente) {
      res.json(continente);
    } else {
      res.status(404).json({ error: 'Continente não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar continente.' });
  }
};

export const createContinente = async (req: Request, res: Response) => {
  const { nome, descricao } = req.body;
  try {
    const continente = await prisma.continente.create({
      data: {nome: nome, descricao: descricao},
    });
    res.status(201).json(continente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar continente.' });
  }
};

export const updateContinente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    const continente = await prisma.continente.update({
      where: { id: Number(id) },
      data: { nome, descricao },
    });
    res.json(continente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar continente.' });
  }
};

export const deleteContinente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Verificar se existem países vinculados
    const paises = await prisma.pais.findMany({
      where: { id_continente: Number(id) },
    });
    if (paises.length > 0) {
      return res.status(400).json({ error: 'Não é possível excluir continente com países vinculados.' });
    }

    await prisma.continente.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir continente.' });
  }
};