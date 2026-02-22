# Petlove App 🐾

A modern web application for pet lovers to manage their pets, find friends for their pets, browse notices, and connect with pet-related services.

## 🌐 Live Demo

[View on Vercel](https://petlove-app.vercel.app)

## 📋 About the Project

**Petlove** is a comprehensive pet management platform that allows users to:

- 🔐 Register and authenticate
- 🐶 Add and manage their pets with photos (via Cloudinary upload)
- 📰 Browse pet-related news
- 🔔 View pet adoption notices with filtering and pagination
- 🤝 Find friends and pet services in your area
- 👤 Manage user profile with avatar upload
- ❤️ Save favorite notices

## 🛠️ Technologies Used

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Routing & State

- **React Router DOM v7** - Client-side routing
- **React Context API** - Global state management (Auth, Favorites, Loader)

### Forms & Validation

- **React Hook Form** - Form state management
- **Yup** - Schema validation

### UI Components

- **React Select** - Custom select dropdowns
- **React DatePicker** - Date input component
- **React Toastify** - Toast notifications
- **React Spinners** - Loading indicators

### Styling

- **CSS Modules** - Scoped component styles
- **Modern Normalize** - CSS reset

### Backend Integration

- RESTful API with JWT authentication
- **Cloudinary** - Image upload and storage

## 📐 Design

- [Figma Mockup](https://www.figma.com/design/puMNfZVg4YI8UZoJ1QiLLi/Petl%F0%9F%92%9Bve?node-id=55838-750&t=Qp1p3B0PkgTlWxjo-0)

## 📱 Features

### Responsive Design

- Mobile-first approach
- Breakpoints: 375px, 768px, 1280px
- Semantic HTML5 markup
- Valid and accessible

### Pages

- `/` - Main landing page
- `/home` - Home page with app introduction
- `/news` - Pet-related news with search and pagination
- `/notices` - Pet adoption notices with filters
- `/friends` - Pet services and organizations
- `/register` - User registration
- `/login` - User authentication
- `/profile` - User profile with pets management
- `/add-pet` - Add new pet form (protected route)

### Authentication

- JWT token-based authentication
- Protected routes for authenticated users
- Persistent login state

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/petlove-app.git

# Navigate to project directory
cd petlove-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   │   ├── AddPetForm/
│   │   ├── Header/
│   │   ├── LoginForm/
│   │   ├── PetsList/
│   │   └── ...
│   └── pages/          # Page components
│       ├── Home/
│       ├── News/
│       ├── Notices/
│       └── ...
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   ├── FavoritesContext.tsx
│   └── LoaderContext.tsx
├── services/           # API services
│   └── api/
│       ├── cloudinary.ts
│       ├── friends.ts
│       ├── news.ts
│       ├── notices.ts
│       └── users.ts
├── assets/             # Static assets
├── App.tsx             # Main app component
├── Layout.tsx          # Layout wrapper
└── main.tsx            # Entry point
```

## 📜 Technical Requirements

- ✅ Interface matches mockup and displays correctly on all devices
- ✅ Semantic and valid HTML markup
- ✅ No console errors
- ✅ React with TypeScript
- ✅ Form validation with Yup
- ✅ Routing with React Router
- ✅ Formatted code without unnecessary comments
- ✅ Deployed on Vercel

## 👨‍💻 Author

Created as a portfolio project for GoIT bootcamp.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
