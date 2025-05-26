<?php
require_once 'Database.php';

class Word {
    public static function getRandomWord() {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT word FROM words ORDER BY RAND() LIMIT 1');
        return $stmt->fetchColumn();
    }
}
