<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$details = explode(",", ltrim(rtrim(filter_input(INPUT_POST, "details", FILTER_SANITIZE_STRING))));

if( strlen($details[1]) > 2 && strlen($details[2]) > 8)
{
if (empty($details[0])) {
    $query = "INSERT INTO records ( customer, address, price, note, quantity, name, postcode)"
            . "VALUES ( :customer,:address,:price,:note,:quantity,:name,:postcode)";
    $statement = $dbConnection->prepare($query);
    $statement->bindParam(":customer", $details[1], PDO::PARAM_STR);
    $statement->bindParam(":address", $details[2], PDO::PARAM_STR);
    $statement->bindParam(":price", $details[3], PDO::PARAM_STR);
    $statement->bindParam(":note", $details[4], PDO::PARAM_STR);
    $statement->bindParam(":quantity", $details[5], PDO::PARAM_STR);
    $statement->bindParam(":name", $details[7], PDO::PARAM_STR);
    $statement->bindParam(":postcode", $details[8], PDO::PARAM_STR);
    $statement->execute();
    
    $query = "SELECT id FROM records WHERE customer = :customer AND address= :address AND price= :price AND note= :note AND quantity= :quantity AND name= :name AND postcode= :postcode";
    $statementFind = $dbConnection->prepare($query);
    $statementFind->bindParam(":customer", $details[1], PDO::PARAM_STR);
    $statementFind->bindParam(":address", $details[2], PDO::PARAM_STR);
    $statementFind->bindParam(":price", $details[3], PDO::PARAM_STR);
    $statementFind->bindParam(":note", $details[4], PDO::PARAM_STR);
    $statementFind->bindParam(":quantity", $details[5], PDO::PARAM_STR);
    $statementFind->bindParam(":name", $details[7], PDO::PARAM_STR);
    $statementFind->bindParam(":postcode", $details[8], PDO::PARAM_STR);
    $statementFind->execute();
    $result = $statementFind->fetchAll(PDO::FETCH_OBJ);
    $_SESSION["record_id"] = $result[0]->id;
} else {
    $query = "UPDATE records SET customer = :customer, address= :address ,price= :price, note= :note,quantity= :quantity , name= :name, postcode= :postcode WHERE id = :id";
    $statement = $dbConnection->prepare($query);
    $statement->bindParam(":id", $details[0], PDO::PARAM_STR);
    $statement->bindParam(":customer", $details[1], PDO::PARAM_STR);
    $statement->bindParam(":address", $details[2], PDO::PARAM_STR);
    $statement->bindParam(":price", $details[3], PDO::PARAM_STR);
    $statement->bindParam(":note", $details[4], PDO::PARAM_STR);
    $statement->bindParam(":quantity", $details[5], PDO::PARAM_STR);
    $statement->bindParam(":name", $details[7], PDO::PARAM_STR);
    $statement->bindParam(":postcode", $details[8], PDO::PARAM_STR);
    $statement->execute();
    $_SESSION["record_id"] =  $details[0];
}
print_r(true);
    exit;

}
else
{
    print_r(false);
    exit;
}
?>