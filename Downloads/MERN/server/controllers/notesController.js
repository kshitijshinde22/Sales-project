import Note from '../models/Note.js';

// @desc    Get all notes for logged-in user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req, res) => {
  try {
    const { archived, tag } = req.query;
    const query = { user: req.user._id };

    if (archived === 'true') {
      query.archived = true;
    } else {
      query.archived = false;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const notes = await Note.find(query).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  try {
    const { title, content, tags, color, pinned, archived } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' });
    }

    const note = await Note.create({
      title,
      content: content || '',
      tags: tags || [],
      color: color || 'white',
      pinned: pinned || false,
      archived: archived || false,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  try {
    const { title, content, tags, color, pinned, archived } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content !== undefined ? content : note.content;
    note.tags = tags !== undefined ? tags : note.tags;
    note.color = color || note.color;
    note.pinned = pinned !== undefined ? pinned : note.pinned;
    note.archived = archived !== undefined ? archived : note.archived;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await Note.deleteOne({ _id: req.params.id });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle pin status
// @route   PUT /api/notes/pin/:id
// @access  Private
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.pinned = !note.pinned;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle archive status
// @route   PUT /api/notes/archive/:id
// @access  Private
export const toggleArchive = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.archived = !note.archived;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search notes
// @route   GET /api/notes/search
// @access  Private
export const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const notes = await Note.find({
      user: req.user._id,
      archived: false,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    }).sort({ pinned: -1, updatedAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unique tags for user
// @route   GET /api/notes/tags
// @access  Private
export const getTags = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    const allTags = notes.flatMap((note) => note.tags);
    const uniqueTags = [...new Set(allTags)];
    res.json(uniqueTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

