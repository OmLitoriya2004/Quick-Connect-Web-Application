![image](https://github.com/user-attachments/assets/6f285568-2c60-4d9c-bb35-f7d237e50157)

# 🌐 Quick Connect — Real-time Communication Platform

Quick Connect is a feature-rich real-time communication platform that offers seamless **chat**, **video calls**, **language exchange**, and much more. It supports **1-on-1 and group conversations**, **screen sharing**, **message reactions**, and **typing indicators**, all with a beautifully designed user interface and smooth user experience.

---

## 🚀 Features

- ✅ Real-time Messaging with:
  - Typing indicators
  - Emoji reactions
  - Seen & delivered statuses

- 🎥 1-on-1 and Group **Video Calls**
  - Screen sharing
  - Recording support

- 🔐 **JWT Authentication**
  - Protected routes
  - Secure login/signup system

- 🗣️ **Language Exchange Platform**
  - Connect with people to learn new languages
  - 32 Unique UI Themes for personalization

- 🌍 **Global State Management**
  - Powered by Zustand
  - Efficient cache and data syncing using TanStack Query

- 💾 **Free Deployment**
  - Fully functional and publicly hosted version
  - Scalable backend with MongoDB and Stream

- 🛡️ Robust **Error Handling**
  - Frontend and backend level

- 🌈 And much more!

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Styling | Other Tools |
|---------|---------|----------|---------|-------------|
| React   | Express | MongoDB  | TailwindCSS | Zustand, TanStack Query, Stream, JWT |

---

## 🖼️ UI Themes

Enjoy 32 beautifully designed UI themes that let you personalize your experience. Each user can select a theme, and it will be remembered across sessions.

---

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/OmLitoriya2004/Quick-Connect-Web-Application.git
cd Quick-Connect-Web-Application
```

### 2. Install Dependencies and Run

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd ../backend
npm install
npm run dev
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory with the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

---

## 🌍 Deployment

This project is deployed using scalable services like Render and Stream.

- 🔗 **Live Demo**: [https://quick-connect-web-application.onrender.com](https://quick-connect-web-application.onrender.com)  
- 📁 **CI/CD**: Automatically deploys when changes are pushed to the `master` branch.  
- 🔐 **Note**: Ensure all environment variables are properly configured in your deployment platform.

---

## 🙌 Acknowledgements

Thanks to open-source tools and platforms like **Stream**, **Render**, **Zustand**, and **TanStack Query** for powering this project.
