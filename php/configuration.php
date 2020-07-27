<?php
/* * ************************ You need to set the values below to match your project ************************ */

// localhost website and localhost database
$localHostSiteFolderName = "D00222467";

$localhostDatabaseName = "reitechltd";
$localHostDatabaseHostAddress = "localhost";
$localHostDatabaseUserName = "root";
$localHostDatabasePassword = "";



// remotely hosted website and remotely hosted database       /* you will need to get the server details below from your host provider */
$serverWebsiteName = "http://mysql02.comp.dkit.ie/D00222467/Crud"; /* use this address if hosting website on the college students' website server */

$serverDatabaseName = "reitechltd";
$serverDatabaseHostAddress = "mysql02.comp.dkit.ie";         /* use this address if hosting database on the college computing department database server */
$serverDatabaseUserName = "root";
$serverDatabasePassword = "";




$useLocalHost = true;      /* set to false if your database is NOT hosted on localhost */



/* * ******************************* WARNING                                 ******************************** */
/* * ******************************* Do not modify any code BELOW this point ******************************** */

if ($useLocalHost == true)
{
    $siteName = "http://localhost/" . $localHostSiteFolderName;
    $dbName = $localhostDatabaseName;
    $dbHost = $localHostDatabaseHostAddress;
    $dbUsername = $localHostDatabaseUserName;
    $dbPassword = $localHostDatabasePassword;
}
else  // using remote host
{
    $siteName = $serverWebsiteName;
    $dbName = $serverDatabaseName;
    $dbHost = $serverDatabaseHostAddress;
    $dbUsername = $serverDatabaseUserName;
    $dbPassword = $serverDatabasePassword;
}



chmod("configuration.php", 0600); // do not allow anyone to view this file
?>