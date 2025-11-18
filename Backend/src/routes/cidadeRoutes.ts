import { Router } from 'express';
import {
  getCidades,
  getCidade,
  createCidade,
  updateCidade,
  deleteCidade,
  getCidadesPorPais,
  getCidadesPorContinente,
  getCidadeClima,
} from '../controllers/cidadeController';

const router = Router();

router.get('/', getCidades);
router.get('/:id', getCidade);
router.post('/', createCidade);
router.put('/:id', updateCidade);
router.delete('/:id', deleteCidade);
router.get('/pais/:id', getCidadesPorPais);
router.get('/continente/:id', getCidadesPorContinente);
router.get('/:id/clima', getCidadeClima);

export default router;