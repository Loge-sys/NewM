<?php
include("database.php");
header("Access-Control-Allow-Origin: *");  

class funcoes{
    public function criarUsuario($name, $email, $cpf, $address, $phone, $birth, $note){
        $db = new database();
	    $conexao = $db->getConnection();
        try {
            $inserir = $conexao->prepare("INSERT INTO users (name, email, cpf, address, phone, birth, note) VALUES (:name, :email, :cpf, :address, :phone, :birth, :note)");  
            $inserir->bindValue(':name', $name);
            $inserir->bindValue(':email', $email);
            $inserir->bindValue(':cpf',$cpf);
            $inserir->bindValue(':address', $address);
            $inserir->bindValue(':phone', $phone);
            $inserir->bindValue(':birth', $birth);
            $inserir->bindValue(':note', $note);

            $inserir->execute();
            return $inserir;
        
    } catch(PDOException $e){
        throw new PDOException($e);
        }
    }
    public function deletarUsuario($id){
        $db = new database();
        $conexao = $db->getConnection();
            try {
                $inserir = $conexao->prepare('DELETE from users where id = :id');
                $inserir->bindValue(':id', $id);
                $inserir->execute();
                return $inserir;
            
        } catch(PDOException $e){
            throw new PDOException($e);
            }
      
    }
    public function editarUsuario($id,$name,$email, $cpf, $address, $phone, $birth, $note){
    $db = new database();
	$conexao = $db->getConnection();
        try {
            $inserir = $conexao->prepare('UPDATE users SET name = :name, email = :email, cpf = :cpf, address = :address, phone = :phone, birth= :birth, note = :note WHERE id = :id');
            $inserir->bindValue(':id', $id);
            $inserir->bindValue(':name', $name);
            $inserir->bindValue(':email', $email);
            $inserir->bindValue(':cpf', $cpf);
            $inserir->bindValue(':address', $address);
            $inserir->bindValue(':phone', $phone);
            $inserir->bindValue(':birth', $birth);
            $inserir->bindValue(':note', $note);

            $inserir->execute();
            return $inserir;
            
    } catch(PDOException $e){
        throw new PDOException($e);
        }
    }
    public function exibirUsuarios(){
        $db = new database();
        $conexao = $db->getConnection();
        try {
            $BFetch=$conexao->prepare("select * from users");
            $BFetch->execute();
            $J=[];
            $I=0;
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $J[$I]=[
                    "id"=>$Fetch['id'],
                    "name"=>$Fetch['name'],
                    "email"=>$Fetch['email'],
                    "cpf"=>$Fetch['cpf'],
                    "address"=>$Fetch['address'],
                    "birth"=>$Fetch['birth'],
                    "phone"=>$Fetch['phone'],
                    "note"=>$Fetch['note'],
                ];
                $I++;
            }
            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
            echo json_encode($J);
            return $J;
    } catch(PDOException $e){
        throw new PDOException($e);
    }
    }

    public function detalheUsuario($id){
        $db = new database();
        $conexao = $db->getConnection();
        try {
            $BFetch=$conexao->prepare("select * from users where id = :id");
            $BFetch->bindValue(':id', $id);
            $BFetch->execute();
            $J=[];
            $I=0;
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $J[$I]=[
                    "id"=>$Fetch['id'],
                    "name"=>$Fetch['name'],
                    "email"=>$Fetch['email'],
                    "cpf"=>$Fetch['cpf'],
                    "address"=>$Fetch['address'],
                    "birth"=>$Fetch['birth'],
                    "phone"=>$Fetch['phone'],
                    "note"=>$Fetch['note'],
                ];
                $I++;
            }
            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
            echo json_encode($J);
            return $J;
    } catch(PDOException $e){
        throw new PDOException($e);
    }
    }
}
?>