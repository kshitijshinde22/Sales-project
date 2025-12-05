import { useState } from 'react';
import { Pin, Archive, Trash2, Edit2, Copy } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const NoteCard = ({ note, onUpdate, onDelete, onEdit = () => {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    yellow: 'bg-noteYellow dark:bg-yellow-900',
    blue: 'bg-noteBlue dark:bg-blue-900',
    green: 'bg-noteGreen dark:bg-green-900',
    pink: 'bg-notePink dark:bg-pink-900',
    grey: 'bg-noteGrey dark:bg-gray-700',
    white: 'bg-white dark:bg-gray-800',
  };

  const handlePin = async () => {
    try {
      const response = await api.put(`/notes/pin/${note._id}`);
      onUpdate(response.data);
      toast.success(note.pinned ? 'Note unpinned' : 'Note pinned');
    } catch (error) {
      toast.error('Failed to pin note');
    }
  };

  const handleArchive = async () => {
    try {
      const response = await api.put(`/notes/archive/${note._id}`);
      onUpdate(response.data);
      toast.success(note.archived ? 'Note unarchived' : 'Note archived');
    } catch (error) {
      toast.error('Failed to archive note');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${note._id}`);
        onDelete(note._id);
        toast.success('Note deleted');
      } catch (error) {
        toast.error('Failed to delete note');
      }
    }
  };

  const handleCopy = () => {
    const text = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    toast.success('Note copied to clipboard');
  };

  return (
    <div
      className={`${colorClasses[note.color] || colorClasses.white} rounded-lg shadow-md p-4 min-h-[200px] transition-all duration-200 hover:shadow-xl cursor-pointer relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {note.pinned && (
        <div className="absolute top-2 right-2">
          <Pin className="w-4 h-4 text-gray-600 dark:text-gray-400 fill-current" />
        </div>
      )}
      
      <div className="mb-2">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 break-words">
          {note.title}
        </h3>
      </div>
      
      <div className="text-gray-700 dark:text-gray-300 text-sm mb-3 break-words whitespace-pre-wrap">
        {note.content}
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className={`flex items-center justify-between mt-auto pt-2 border-t border-gray-200 dark:border-gray-600 transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex space-x-2">
          <button
            onClick={handlePin}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title={note.pinned ? 'Unpin' : 'Pin'}
          >
            <Pin
              className={`w-4 h-4 ${note.pinned ? 'fill-current' : ''} text-gray-600 dark:text-gray-400`}
            />
          </button>
          <button
            onClick={handleArchive}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title={note.archived ? 'Unarchive' : 'Archive'}
          >
            <Archive className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-red-200 dark:hover:bg-red-900 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

