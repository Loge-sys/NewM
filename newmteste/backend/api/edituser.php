<?php
    require_once("funcoes.php");
    $funcoesObj = new funcoes();
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $cpf = $_POST['cpf'];
    $address = $_POST['address'];
    $birth = $_POST['birth'];
    $phone = $_POST['phone'];
    $note = $_POST['note'];
   
    $result = $funcoesObj->editarUsuario($id,$name,$email,$cpf,$address,$phone,$birth,$note);

    return $result;
 ?>