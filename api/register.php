<?php
require_once '../classes/User.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$result = User::register($data['username'], $data['password']);
echo json_encode(['success' => $result]);
