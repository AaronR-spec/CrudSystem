<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$products = explode(",", ltrim(rtrim(filter_input(INPUT_POST, "products", FILTER_SANITIZE_STRING))));

$query = "SELECT * FROM product_purchased WHERE order_id = :id";
$statement = $dbConnection->prepare($query);
$statement->bindParam(":id", $_SESSION["record_id"], PDO::PARAM_STR);
$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);
$row = mysqli_fetch_row($result);
if (implode(null, $row) == null) {
    $query = "DELETE FROM product_purchased WHERE order_id = :id";
    $statement = $dbConnection->prepare($query);
    $statement->bindParam(":id", $_SESSION["record_id"], PDO::PARAM_STR);
    $statement->execute();
}

for ($i = 0; $i < count($products); $i++) {
    if ($products[$i] != 0) {
        $query = "SELECT * FROM products WHERE product_id = :id";
        $statementDes = $dbConnection->prepare($query);
        $statementDes->bindParam(":id", $products[$i], PDO::PARAM_STR);
        $statementDes->execute();
        $result = $statementDes->fetchAll(PDO::FETCH_OBJ);
        $description = $result[0]->description;
        $price = $result[0]->price;
        //make price added when made//
        $query = "INSERT INTO product_purchased (product_id, order_id,description,price)"
                . "VALUES ( :product_id,:order_id,:description,:price)";
        $statement = $dbConnection->prepare($query);
        $statement->bindParam(":product_id", $products[$i], PDO::PARAM_STR);
        $statement->bindParam(":order_id", $_SESSION["record_id"], PDO::PARAM_STR);
        $statement->bindParam(":description",$description, PDO::PARAM_STR);
                $statement->bindParam(":price",$price, PDO::PARAM_STR);

        $statement->execute();
    }
}
?>