<?php
    require_once("funcoes.php");
    $funcoesObj = new funcoes();
    $result = $funcoesObj->exibirUsuarios();
    
    return $result;
 ?>