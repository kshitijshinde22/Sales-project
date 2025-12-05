import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, selectedTag, searchQuery]);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes?archived=false');
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch notes');
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.get('/notes/tags');
      setTags(response.data);
    } catch (error) {
      // Silently fail - tags are optional
    }
  };

  const filterNotes = () => {
    let filtered = [...notes];

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((note) => note.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort: pinned first, then by updatedAt
    filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    setFilteredNotes(filtered);
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleNoteUpdate = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    fetchTags();
  };

  const handleNoteCreate = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    fetchTags();
  };

  const handleNoteDelete = (noteId) => {
    setNotes((prev) => prev.filter((note) => note._id !== noteId));
    fetchTags();
  };

  const handleModalSuccess = (note) => {
    if (editingNote) {
      handleNoteUpdate(note);
    } else {
      handleNoteCreate(note);
    }
  };

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SearchBar onSearch={setSearchQuery} />
          <button
            onClick={handleCreateNote}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Note
          </button>
        </div>

        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery || selectedTag
                ? 'No notes found matching your criteria'
                : 'No notes yet. Create your first note!'}
            </p>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Pinned
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onUpdate={handleNoteUpdate}
                      onDelete={handleNoteDelete}
                      onEdit={handleEditNote}
                    />
                  ))}
                </div>
              </div>
            )}

            {unpinnedNotes.length > 0 && (
              <div>
                {pinnedNotes.length > 0 && (
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Others
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {unpinnedNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onUpdate={handleNoteUpdate}
                      onDelete={handleNoteDelete}
                      onEdit={handleEditNote}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
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

export default Dashboard;

