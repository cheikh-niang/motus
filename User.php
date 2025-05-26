<?php
require_once 'Database.php';

class User {
    public static function register($username, $password) {
        $pdo = Database::getInstance();
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
        return $stmt->execute([$username, $hash]);
    }

    public static function login($username, $password) {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($password, $user['password_hash'])) {
            return $user['id'];
        }
        return false;
    }
}
