const mongoose = require('mongoose');
const { Schema } = mongoose;
//const User = mongoose.model('User');

const NoteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Note', NoteSchema);
