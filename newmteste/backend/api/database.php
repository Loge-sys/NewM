<?php 

class database{

    public $conn;
    public function getConnection(){

        $host = "jelani.db.elephantsql.com";
        $data = "sfageuth";
        $usuario = "sfageuth";
        $senha = "tChkFYW0efuZKc4T05CXeU_hD23sXUIM";
        try{
             $conn = new PDO("mysql:host=localhost;dbname=newm", "root", "");
         return $conn;
        }catch (PDOException $e){
             echo $e->getMessage();
        }
 }
 

}

?>