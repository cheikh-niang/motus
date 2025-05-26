<?php
require_once '../classes/Score.php';
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);
$result = Score::save($_SESSION['user_id'], $data['attempts'], $data['is_win']);
echo json_encode(['success' => $result]);
