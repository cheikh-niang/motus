# Motus Web Game

A modern web-based version of the classic French word-guessing game *Motus*, built using **HTML, CSS, JavaScript, PHP**, and **MySQL**.

## Project Description

**Motus** is a logic and vocabulary game where the player must guess a hidden word in **6 attempts**. The game provides visual clues for each letter guessed:
- 🟥 **Red square**: Letter is correctly placed.
- 🟡 **Yellow circle**: Letter is in the word but misplaced.
- 🟦 **Blue background**: Letter is not in the word.

The **first letter** of the target word is always revealed by default.

---

## Features

- 🎮 **Interactive Game Page**:
  - Random word selection from the database.
  - Real-time user input via keyboard (no page reloads).
  - Feedback after each guess with clear visual indicators.

- **Logic and Verification**:
  - 6 chances per game.
  - Validation of player input based on position and presence of letters.

- **User Authentication**:
  - Registration and login system with secure data handling.


- **Attractive UI**:
  - Responsive and user-friendly interface.

- **Database**:
  - MySQL database named `motus` with structured tables for:
    - Users
    - Game words
    - Scores 

- 💻 **Object-Oriented Programming (OOP)**:
  - Backend architecture designed with OOP principles in PHP for scalability and clarity.

---

## 🔧 Installation

1. Clone the repository.
2. Import the SQL file into your MySQL database as `motus`.
3. Configure your database credentials in your PHP config file.
4. Start your local server (e.g., XAMPP, MAMP).
5. Access the project via your browser.

---

## 📌 Requirements

- PHP 7.x or later
- MySQL
- Local web server (XAMPP, WAMP, MAMP)
- Modern web browser

---
