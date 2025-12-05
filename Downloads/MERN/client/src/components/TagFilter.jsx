const TagFilter = ({ tags, selectedTag, onTagSelect }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onTagSelect('')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedTag === ''
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;

