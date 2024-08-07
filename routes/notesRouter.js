
import express from 'express'
const router = express.Router();
import auth from '../middlewares/auth.js';
import notesCtrl from '../controllers/noteCtrl.js';




router.route("/")
    .get(auth, notesCtrl.getNotes)
    .post(auth, notesCtrl.createNote)


router.route("/:id")
    .get(auth, notesCtrl.getNote)
    .put(auth, notesCtrl.updateNote)
    .delete(auth, notesCtrl.deleteNote)

export default router;