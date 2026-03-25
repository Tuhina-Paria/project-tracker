

# 🚀 Task Manager Dashboard (Internship Assignment)

A modern, responsive **Task Management Dashboard** built with **React + TypeScript + Zustand + Tailwind CSS**.
This project demonstrates clean UI/UX, efficient state management, and scalable frontend architecture.

---

## 📌 📖 About This Project

This project was developed as part of an **internship assessment** to showcase:

* Frontend development skills
* State management understanding
* UI/UX design thinking
* Code structure & scalability

The goal was to build a **real-world task management system** 

---

## ✨ Features

✅ Kanban Board (Drag & Drop)
✅ List View with Virtual Scrolling (Performance Optimized)
✅ Add / Delete Tasks
✅ Task Status Update
✅ Search Functionality
✅ Priority Filtering
✅ Responsive Design (Desktop + Tablet)
✅ Clean UI with Smooth Interactions

---

## 🧠 Tech Stack

* **React (with TypeScript)** – UI Development
* **Zustand** – State Management
* **Tailwind CSS** – Styling
* **Vite** – Fast Build Tool

---

## ⚙️ How to Run This Project

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Tuhina-Paria/project-tracker
```

### 2️⃣ Navigate to Project Folder

```bash
cd project-tracker
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Open in Browser

```
http://localhost:5173
```

---

## 🏗️ Step-by-Step Development Approach

### 🔹 1. Project Setup

* Created project using **Vite + React + TypeScript**
* Structured folders for scalability

---

### 🔹 2. UI Design

* Designed a clean dashboard layout
* Built:

  * Header
  * Task form
  * Kanban board
  * List view
* Used **Tailwind CSS** for fast styling

---

### 🔹 3. State Management (Zustand)

* Created a centralized store (`taskStore`)
* Managed:

  * Task list
  * Add task
  * Delete task
  * Update status

---

### 🔹 4. Core Features

* Add task with title, priority, assignee
* Drag & drop between columns
* Delete task functionality and Implement Avatar for each assignee.

---

### 🔹 5. Advanced Features

* Search tasks (real-time)
* Filter by priority
* Virtual scrolling for performance optimization

---

### 🔹 6. Responsiveness

* Desktop → 4 column layout
* Tablet → 2 column layout
* Flexible input & layout system

---

## 🤔 Why Zustand Instead of React Context?

I chose **Zustand** over React Context for the following reasons:

### ✅ 1. Simplicity

Zustand requires **less boilerplate code** compared to Context API.

### ✅ 2. Performance

* Context API can cause **unnecessary re-renders**
* Zustand updates only the components that need changes

### ✅ 3. Scalability

* Easier to manage growing state
* Cleaner separation of logic

### ✅ 4. Developer Experience

* No need for providers or complex setup
* Simple and readable store structure

👉 Overall, Zustand made the application **faster, cleaner, and easier to maintain**.

---

## 📁 Project Structure

```
src/
│── App.tsx
│── store/
│     └── taskStore.ts
│── types/
|      └── task.ts
|── utils/ 
       └── data.ts    
│── styles/
```

---

## 🎯 Key Highlights

* Clean and modular code structure
* Focus on real-world usability
* Performance optimization using virtual scroll
* Modern UI design principles applied

---



## 🙌 Final Note

This project was created as part of an **internship assessment**, and it reflects my practical understanding of modern frontend development.

---

⭐ If you like this project, feel free to explore and improve it!
