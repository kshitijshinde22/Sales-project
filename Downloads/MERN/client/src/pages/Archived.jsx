import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import AddNoteModal from '../components/AddNoteModal';

const Archived = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, searchQuery]);

  const fetchArchivedNotes = async () => {
    try {
      const response = await api.get('/notes?archived=true');
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch archived notes');
      setLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = [...notes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setFilteredNotes(filtered);
  };

  const handleNoteUpdate = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    // If note is unarchived, remove it from the list
    if (!updatedNote.archived) {
      setNotes((prev) => prev.filter((note) => note._id !== updatedNote._id));
    }
  };

  const handleNoteDelete = (noteId) => {
    setNotes((prev) => prev.filter((note) => note._id !== noteId));
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleModalSuccess = (note) => {
    handleNoteUpdate(note);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Archived Notes
          </h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery
                ? 'No archived notes found matching your criteria'
                : 'No archived notes yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onUpdate={handleNoteUpdate}
                onDelete={handleNoteDelete}
                onEdit={handleEditNote}
              />
            ))}
          </div>
        )}

        <AddNoteModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
          note={editingNote}
          onSuccess={handleModalSuccess}
        />
      </div>
    </div>
  );
};

export default Archived;

