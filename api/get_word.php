<?php
require_once '../classes/Word.php';
header('Content-Type: application/json');
echo json_encode(['word' => Word::getRandomWord()]);
