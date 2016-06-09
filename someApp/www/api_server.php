<?php
header('Access-Control-Allow-Origin: *');
$method = $_SERVER['REQUEST_METHOD'];
$host = "127.0.0.1";
$user = "loncasorin";
$pass = "";
$db = "parcari";
$port = 3306;
global $spot , $status , $queryStatus , $verifyStatus;
$connection = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());

// Cand aveti timp sa va uitati peste cod, am facut cateva modificari si sper ca am terminat ;)

/**
 * Just like the "getQuery" method, isolate all mysql related logic into separate functions. they are easier to maintain and reuse
 *
 * AVOID CODE DUPLICATION at all cost. instead of copy-pasing lines of code like "print x" 3 times, isolate the code in a separate function and just call that function.
 * it's easier to change something in one place instead of 3
 *
 * In the switch cases, there is a very small difference between "GET" and "POST" in your code. the rest is duplicated.
 * Make sure to only include logic that belongs to the "switch" statement in it, and take out the common code to avoid duplication.
 *
 * @NOTE: See a bit of sql injection
 *
 */

switch ($method) {
  case 'POST':
    setPost($spot , $status);
    $verify = false;
    $query = "SELECT id,status FROM parcare WHERE id='$spot'";
    $result = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row != null && verifyStatus($status) == true){
        $query = "UPDATE parcare SET status='$status' WHERE id='$spot'";
        $verify = true;
        echo "200";
    }
    if ($verify == false){
      if (verifySpot($spot) == true && verifyStatus($status) == true){
        $query = "INSERT INTO parcare (id,status) VALUES ('$spot','$status');";
        $result = mysqli_query($connection, $query);
        echo "200";
      }
    }
    else{
      $result = mysqli_query($connection, $query);
    }
    break;

  case 'GET':
    $response = [];
    setGet($spot , $status);
    $query = getQuery($spot , $status , $verifyStatus , $queryStatus);
    if ($verifyStatus == true){
      $resultId = mysqli_query($connection , $query);
      $resultStatus = mysqli_query($connection , $queryStatus);
      $rowId = mysqli_fetch_row($resultId);
      if ($rowId){
        $response[$rowId[0]] = $rowId[1];
        // print "SPOT is: " . $rowId[0] . " and is: " . $rowId[1]."<br>\n";
      }
      $rowStatus = mysqli_fetch_row($resultStatus);
      while ($rowStatus){
        if ($rowId[0] != $rowStatus[0])
        {
          $response[$rowStatus[0]] = $rowStatus[1];
          // print "SPOT is: " . $rowStatus[0] . " and is: " . $rowStatus[1]."<br>\n";
        }
        $rowStatus = mysqli_fetch_row($resultStatus);
      }
    }
    else{
      $result = mysqli_query($connection , $query);
      $row = mysqli_fetch_row($result);
      while ($row){
        $response[$row[0]] = $row[1];
        // print "SPOT is: " . $row[0] . " and is: " . $row[1]."<br>\n";
        $row = mysqli_fetch_row($result);
      }
    }
    echo json_encode($response);
    break;

  default:
    print 'Method Not Allowed';
}
mysqli_close ($connection);

function getQuery($id = null , $status = null , &$verifyStatus = null , &$queryStatus = null)
{
      $baseQuery = "SELECT id,status FROM parcare";
      if ($id == null && $status == null){
        return $baseQuery;
      }
      elseif(verifySpot($id) == true && verifyStatus($status) == true){
          $verifyStatus = true;
          $queryStatus = $baseQuery . " WHERE status='$status'";
          return $baseQuery . " WHERE id='$id'";
      }
      elseif(verifyStatus($status) == true){
        return $baseQuery . " WHERE status='$status'";
      }
      elseif(verifySpot($id) == true){
        return $baseQuery . " WHERE id='$id'";
      }
}

function setGet(&$spot = null , &$status = null){
  $spot = $_GET['spot'];
  $status = $_GET['status'];
}

function setPost(&$spot = null , &$status = null){
  $spot = $_POST['spot'];
  $status = $_POST['status'];
}

function verifyStatus($status){
  if ($status == 'free' || $status == 'reserved'){
    return true;
  }
  else{
    return false;
  }
}

function verifySpot($spot){
  if (is_numeric($spot) == true && $spot > 0){
    return true;
  }
  else{
    return false;
  }
}

?>
