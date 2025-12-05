# 🔥 NoteFlow – Smart Notes App

A complete MERN stack notes application with authentication, CRUD operations, search, tags, pin/archive functionality, and a beautiful Google Keep-inspired UI.

## ⭐ Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ JWT-based Authentication
- ✅ Protected Routes
- ✅ Password Hashing (bcrypt)

### Notes Management
- ✅ Create Notes (with title, content, tags, color, pin)
- ✅ View All Notes (Grid Layout)
- ✅ Edit Notes
- ✅ Delete Notes
- ✅ Pin/Unpin Notes
- ✅ Archive/Unarchive Notes
- ✅ Search Notes (by title, content, tags)
- ✅ Tag Filtering
- ✅ Color Selection (Yellow, Blue, Green, Pink, Grey, White)
- ✅ Copy Note to Clipboard

### UI/UX
- ✅ Responsive Design
- ✅ Dark Mode Toggle
- ✅ Toast Notifications
- ✅ Smooth Animations
- ✅ Google Keep-style Card Layout
- ✅ Hover Effects

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **React Context** - State management

## 📁 Project Structure

```
MERN/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── notesRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── NoteCard.jsx
    │   │   ├── AddNoteModal.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── TagFilter.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Archived.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/noteflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Notes
- `GET /api/notes` - Get all notes (Protected)
  - Query params: `archived=true/false`, `tag=tagName`
- `GET /api/notes/:id` - Get single note (Protected)
- `POST /api/notes` - Create a new note (Protected)
- `PUT /api/notes/:id` - Update a note (Protected)
- `DELETE /api/notes/:id` - Delete a note (Protected)
- `PUT /api/notes/pin/:id` - Toggle pin status (Protected)
- `PUT /api/notes/archive/:id` - Toggle archive status (Protected)
- `GET /api/notes/search?query=something` - Search notes (Protected)
- `GET /api/notes/tags` - Get all unique tags (Protected)

## 🎨 Features in Detail

### Notes
- **Title**: Required field
- **Content**: Optional text content
- **Tags**: Array of strings (comma-separated in UI)
- **Color**: One of: yellow, blue, green, pink, grey, white
- **Pinned**: Boolean (pinned notes appear at top)
- **Archived**: Boolean (archived notes moved to separate section)
- **Timestamps**: Automatically managed (createdAt, updatedAt)

### Search
- Search by title, content, or tags
- Real-time filtering as you type
- Case-insensitive search

### Tags
- Automatically extracted from all notes
- Click to filter notes by tag
- Displayed as badges on note cards

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. **Prepare for production:**
   - Update `.env` with production MongoDB URI
   - Set `NODE_ENV=production`
   - Use a strong `JWT_SECRET`

2. **Deploy to Render:**
   - Connect your GitHub repository
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && npm start`
   - Add environment variables in Render dashboard

3. **Deploy to Railway:**
   - Connect your GitHub repository
   - Railway will auto-detect Node.js
   - Add environment variables in Railway dashboard

### Frontend Deployment (Vercel)

1. **Build the project:**
```bash
cd client
npm run build
```

2. **Deploy to Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the client directory
   - Or connect GitHub repo to Vercel dashboard
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL` (your backend URL)

3. **Update API URL:**
   - Update `VITE_API_URL` in Vercel environment variables to point to your deployed backend

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/noteflow
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
NODE_ENV=production
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] Create note
- [ ] Edit note
- [ ] Delete note
- [ ] Pin/unpin note
- [ ] Archive/unarchive note
- [ ] Search notes
- [ ] Filter by tags
- [ ] Change note color
- [ ] Copy note
- [ ] Dark mode toggle
- [ ] Responsive design

## 📝 Notes

- Passwords are hashed using bcrypt before storing
- JWT tokens expire after 30 days
- Notes are soft-deleted (hard delete implemented)
- Search is case-insensitive
- Tags are automatically extracted and deduplicated
- Pinned notes always appear at the top

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Auto-save while typing
- [ ] Checklists inside notes
- [ ] Drag & drop reorder
- [ ] Rich text editor
- [ ] Image attachments
- [ ] Note sharing
- [ ] Reminders/Notifications
- [ ] Export notes (PDF, Markdown)

---

**Built with ❤️ using MERN Stack**

