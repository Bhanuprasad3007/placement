# 🎯 Placement Tracker

**A modern, interactive web application designed for college students to track and manage their placement journey with style.**

![Placement Tracker Preview](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&crop=center)

## ✨ Features

### 🎨 **Interactive Kanban Board**
- **Drag & Drop Interface**: Move companies seamlessly between placement stages
- **6 Placement Stages**: Applied → Round 1 → Round 2 → Round 3 → HR Round → Placed
- **Real-time Updates**: See changes instantly as you progress through your placement journey

### 🏢 **Company Management**
- **Detailed Company Cards**: Track company name, job role, package offered, and descriptions
- **Visual Status Indicators**: Color-coded badges and columns for easy status recognition
- **Smart Organization**: Companies automatically organized by their current placement stage

### 🔐 **User Authentication**
- **Secure Email Login**: Authenticate with your college email
- **Personalized Dashboard**: Each user has their own private placement board
- **User Profile**: Display name, college, and placement statistics

### 📊 **Analytics Dashboard**
- **Placement Statistics**: Track total applications, successful placements, and pending interviews
- **Progress Visualization**: Beautiful cards showing your placement journey metrics
- **Quick Actions**: Add new companies and access email integration

### 🎭 **Beautiful Design**
- **Modern Dark Theme**: Professional look with placement-focused color scheme
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Enhanced user experience with thoughtful transitions
- **Intuitive UI**: Clean, accessible interface designed for students

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **@dnd-kit** - Modern drag and drop library for React
- **Lucide React** - Beautiful, customizable icons
- **Shadcn/ui** - High-quality, accessible UI components

### Development Tools
- **Vite** - Lightning-fast build tool and dev server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

### Backend Ready
- **Supabase Integration Ready** - Prepared for real-time database, authentication, and Gmail API
- **PostgreSQL** - For production data storage
- **Edge Functions** - For Gmail integration and email parsing

## 📸 Screenshots

### Login & Authentication
![Login Screen](https://via.placeholder.com/800x500/1f2937/ffffff?text=Beautiful+Login+Interface)
*Secure email-based login with college credentials*

### Main Dashboard
![Dashboard](https://via.placeholder.com/800x500/1f2937/ffffff?text=Interactive+Kanban+Board)
*Drag and drop companies between placement stages*

### Company Cards
![Company Cards](https://via.placeholder.com/800x500/1f2937/ffffff?text=Detailed+Company+Information)
*Comprehensive company information with visual status indicators*

## 🛠️ Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/placement-tracker.git
   cd placement-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
npm run build
```

## 📱 Usage

### Getting Started
1. **Login**: Use your college email credentials to access the platform
2. **Add Companies**: Click the "Add Company" button to add new applications
3. **Track Progress**: Drag company cards between columns as you progress through interviews
4. **Monitor Stats**: View your placement statistics in the header dashboard

### Drag & Drop Guide
- **Grab any card**: Click and hold anywhere on a company card
- **Drag between columns**: Move cards to represent your interview progress
- **Drop to update**: Release the card in the target column to update status
- **Visual feedback**: Cards show hover states and drag indicators

### Demo Data
The app comes with sample companies including:
- **Big Tech**: Google, Microsoft, Amazon, Meta, Netflix
- **Indian Unicorns**: Flipkart, Zomato, Swiggy
- **Various Roles**: SDE, Frontend, Backend, DevOps, Full Stack
- **Package Range**: ₹28 LPA to ₹50 LPA

## 📁 Project Structure

```
placement-tracker/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Shadcn/ui components
│   │   ├── CompanyCard.tsx  # Individual company card component
│   │   ├── KanbanColumn.tsx # Kanban board column component
│   │   ├── PlacementBoard.tsx # Main kanban board
│   │   ├── PlacementHeader.tsx # Dashboard header
│   │   └── LoginPage.tsx    # Authentication interface
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Main application page
│   │   └── NotFound.tsx     # 404 error page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── index.css            # Global styles and design system
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Green gradient for success and growth
- **Applied**: Blue for new applications
- **Interview Rounds**: Warm colors (yellow, orange, purple)
- **Placed**: Green for successful placements
- **Dark Theme**: Professional dark background with high contrast

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable font sizes with proper contrast
- **Icons**: Lucide React for consistency

## 🔮 Future Enhancements

### 📧 **Gmail Integration**
- Auto-detect placement emails
- Extract company information using AI/NLP
- Automatically create cards from email confirmations

### 📊 **Advanced Analytics**
- Placement success rate tracking
- Timeline visualization
- Interview preparation reminders
- Salary trend analysis

### 🤝 **Social Features**
- Share placement success stories
- College-wide placement statistics
- Peer comparison and motivation

### 📱 **Mobile App**
- React Native mobile application
- Push notifications for interview reminders
- Offline support

## 🤝 Contributing

I welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use the existing design system
- Add proper error handling
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Created with ❤️ for college students**
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join conversations in GitHub Discussions

---

**⭐ Star this repository if it helped you track your placement journey!**

*Built for students, by student. Good luck with your placements! 🚀*
