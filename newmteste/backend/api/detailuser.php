<?php
    header("Access-Control-Allow-Origin: *");  
    require_once("funcoes.php");
    $funcoesObj = new funcoes();
    $id = $_POST['id'];
    $result = $funcoesObj->detalheUsuario($id);

    return $result;
 ?>