<?php
require_once "configuration.php";
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$id= ltrim(rtrim(filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING)));
if(empty($id))
{
    echo"[]";
    exit;
}
$query = "SELECT * FROM product_purchased WHERE order_id = :id";
$searchQuery = $id;
$statement = $dbConnection->prepare($query);
$statement->bindParam(":id", $searchQuery, PDO::PARAM_STR);
$statement->execute();

$json = "[";
if ($statement->rowCount() > 0) {
    $isFirstRecord = true;
    $result = $statement->fetchAll(PDO::FETCH_OBJ);
    foreach ($result as $row) {
        if (!$isFirstRecord) {
            $json .= ",";
        }
           $json .= '{"product_id":"' . $row->product_id. '","price":"' . $row->price .'","description":"' . $row->description .'"}';

        $isFirstRecord = false;
    }
}
$json .= "]";

echo $json;

?>