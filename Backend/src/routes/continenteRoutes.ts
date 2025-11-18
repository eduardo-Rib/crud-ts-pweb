import { Router } from 'express';
import {
  getContinentes,
  getContinente,
  createContinente,
  updateContinente,
  deleteContinente,
} from '../controllers/continenteController';

const router = Router();

router.get('/', getContinentes);
router.get('/:id', getContinente);
router.post('/', createContinente);
router.put('/:id', updateContinente);
router.delete('/:id', deleteContinente);

export default router;