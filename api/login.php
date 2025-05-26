<?php
require_once '../classes/User.php';
header('Content-Type: application/json');
session_start();
$data = json_decode(file_get_contents('php://input'), true);
$user_id = User::login($data['username'], $data['password']);
if ($user_id) {
    $_SESSION['user_id'] = $user_id;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
