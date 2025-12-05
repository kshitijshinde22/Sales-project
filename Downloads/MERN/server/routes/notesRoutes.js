import express from 'express';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleArchive,
  searchNotes,
  getTags,
} from '../controllers/notesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes are protected

router.route('/').get(getNotes).post(createNote);
router.route('/tags').get(getTags);
router.route('/search').get(searchNotes);
router.route('/pin/:id').put(togglePin);
router.route('/archive/:id').put(toggleArchive);
router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

export default router;

