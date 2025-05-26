<?php
require_once 'Database.php';

class Score {
    public static function save($user_id, $attempts, $is_win) {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('INSERT INTO scores (user_id, attempts, is_win) VALUES (?, ?, ?)');
        return $stmt->execute([$user_id, $attempts, $is_win]);
    }
}
