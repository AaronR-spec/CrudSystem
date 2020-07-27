<?php
require_once "configuration.php";
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$sort = ltrim(rtrim(filter_input(INPUT_POST, "sort", FILTER_SANITIZE_STRING)));
if ($sort == "high") 
{
    $query = "SELECT * FROM records ORDER BY price DESC";

}
else if ($sort == "low") 
{
    $query = "SELECT * FROM records ORDER BY price ASC";
}
else if ($sort == "old") 
{
        $query = "SELECT * FROM records ORDER BY date ASC";

}
//Defaults to newest orders
else if($sort == "new")
{
            $query = "SELECT * FROM records ORDER BY date DESC";
}

$statement = $dbConnection->prepare($query);
$statement->execute();


$json = "[";
if ($statement->rowCount() > 0) {
    $isFirstRecord = true;
    $result = $statement->fetchAll(PDO::FETCH_OBJ);
    foreach ($result as $row) {
        if (!$isFirstRecord) {
            $json .= ",";
        }
           $json .= '{"id":"' . $row->id . '","customer":"' . $row->customer . '","address":"' . $row->address . '","price":"' . $row->price . '","note":"' . $row->note . '","quantity":"' . $row->quantity . '","status":"' . $row->status .'","date":"' . $row->date .'","name":"' . $row->name .'"}';

        $isFirstRecord = false;
    }
}
$json .= "]";

echo $json;

?>