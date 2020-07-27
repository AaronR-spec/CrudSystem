<?php

/* Include "configuration.php" file */
require_once "configuration.php";
/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
/* Perform query */
$query = "SELECT * FROM records";
$statement = $dbConnection->prepare($query);
$statement->execute();

/* Manipulate the query result */
$json = "[";
if ($statement->rowCount() > 0) {
    /* Get field information for all fields */
    $isFirstRecord = true;
    $result = $statement->fetchAll(PDO::FETCH_OBJ);
    foreach ($result as $row) {
        if (!$isFirstRecord) {
            $json .= ",";
        }
        /* NOTE: json strings MUST have double quotes around the attribute names, as shown below */
        $json .= '{"id":"' . $row->id . '","customer":"' . $row->customer . '","address":"' . $row->address . '","price":"' . $row->price . '","note":"' . $row->note . '","quantity":"' . $row->quantity . '","status":"' . $row->status . '","name":"' . $row->name . '","date":"' . $row->date .'"}';

        $isFirstRecord = false;
    }
}
$json .= "]";

/* Send the $json string back to the webpage that sent the AJAX request */
echo $json;




?>