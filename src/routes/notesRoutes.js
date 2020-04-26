const router = require('express').Router();
const notesCtrl = require('../controllers/notesCtrl');

router.get('/add', notesCtrl.addNote);
router.post('/create',notesCtrl.createNote);
router.get('/all-notes', notesCtrl.getNotes);
router.get('/edit/:id', notesCtrl.viewUpdateNote);
router.put('/edit/:id', notesCtrl.updatNote);
router.delete('/delete/:id',notesCtrl.deleteNote);

module.exports = router;
