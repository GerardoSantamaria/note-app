const Note = require('../models/Note');

const addNote = (req, res) => {
  res.render('notes/new-note.hbs');
};

const createNote = async (req, res) => {
  const { title, description, priority } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ type: 'error', message: 'Please write a title' });
  }
  if (!description) {
    errors.push({ type: 'error', message: 'Please write a description' });
  }
  if (errors.length > 0) {
    res.render('notes/new-note.hbs', { title, description, errors });
  } else {
    const newNote = new Note({ title, description, priority });
    newNote.user = req.user;
    await newNote.save();
    req.session.sessionFlash = { type: 'success', message: 'Note add!' };
    res.redirect('./all-notes');
  }
};

const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect('../all-notes');
};

const viewUpdateNote = async (req, res) => {
  const note = await Note.findById(req.params.id).then((noteM) => {
    return {
      id: noteM._id,
      title: noteM.title,
      description: noteM.description,
      priority: noteM.priority,
    };
  });
  res.render('notes/edit-note.hbs', { note });
};

const updatNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ type: 'error', message: 'Please write a title' });
  }
  if (!description) {
    errors.push({ type: 'error', message: 'Please write a description' });
  }
  if (errors.length > 0) {
    const note = { id, title, description, priority };
    res.render('notes/edit-note.hbs', { note, errors });
  } else {
    await Note.findByIdAndUpdate(req.params.id, { title, description, priority });
    res.redirect('../all-notes');
  }
};

const getNotes = async (req, res) => {
  await Note.find({ user: req.user })
    .sort({ date: 'desc' })
    .then((notes) => {
      const context = {
        paramNotes: notes.map((note) => {
          return {
            id: note._id,
            title: note.title,
            description: note.description,
            priority: note.priority,
          };
        }),
      };
      res.render('notes/all-notes', { notes: context.paramNotes });
    });
};

module.exports = {
  addNote,
  createNote,
  deleteNote,
  viewUpdateNote,
  updatNote,
  getNotes,
};
