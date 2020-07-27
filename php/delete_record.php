<?php

/* Include "configuration.php" file */
require_once "configuration.php";

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$record = ltrim(rtrim(filter_input(INPUT_POST, "record", FILTER_SANITIZE_STRING)));



/* Perform query */
$query = "DELETE FROM records WHERE id = :record";

$searchQuery = "$record";
$statement = $dbConnection->prepare($query);
$statement->bindParam(":record", $searchQuery, PDO::PARAM_STR);
$statement->execute();

/* Send the $json string back to the webpage that sent the AJAX request */

echo $record;


/* Provide a link for the user to proceed to a new webpage or automatically redirect to a new webpage */
/* This webpage never actually displays. Instead, it runs in the background on the server. */
/* The data contained in the line of code "echo $json;" is automatically sent back inside the "http_request.responseText" of the calling function. */
/* Therefore, no feedback or way to proceed is necessary. */
?>