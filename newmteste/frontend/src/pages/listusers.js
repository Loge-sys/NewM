import { Row, Col, Form, Button, Table, Input, Divider } from "antd";
import React, { useEffect, useState } from "react";
import NewM from "../images/logo-new-m.svg";
import axios from "axios";

const ListUsers = (props) => {
  const [data, setData] = useState([{}]);
  const [query, setQuery] = useState("");
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Observação",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <span>
          <Divider type="vertical" />
        </span>
      ),
    },
  ];

  const deleteUser = (id) => {
    var formData = new FormData();

    formData.append("id", id);
    axios.post(
      "http://localhost/newmteste/backend/api/deleteuser.php",
      formData
    );
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost/newmteste/backend/api/listuser.php")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Row style={{ minHeight: "100vh", backgroundColor: "#FFF" }}>
      <Col
        xs={24}
        md={24}
        xl={24}
        style={{ backgroundColor: "#FFF", padding: 15 }}
      >
        <Col xs={24} md={24} xl={24} style={{ display: "flex" }}>
          <Col
            xs={20}
            md={20}
            xl={20}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <a href="/">
              <img src={NewM} />
            </a>
          </Col>
          <Col
            xs={4}
            md={4}
            xl={4}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              style={{ backgroundColor: "#016ca5", borderColor: "#016ca5" }}
              type="primary"
              size="large"
            >
              {" "}
              <a style={{ color: "#FFF" }} href="/">
                Cadastrar
              </a>
            </Button>
          </Col>
        </Col>
        <Col
          xs={24}
          md={24}
          xl={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <span style={{ fontSize: 32, fontWeight: 500, color: "#000" }}>
            Usuários
          </span>
        </Col>
        <Col
          xs={24}
          md={24}
          xl={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Input.Search
            style={{ width: 400, marginTop: 20, marginBottom: 20 }}
            placeholder="Pesquisar"
            size="large"
            allowClear
            onChange={(event) => setQuery(event.target.value)}
          />
        </Col>
        <Col
          xs={24}
          md={24}
          xl={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <table border="1">
            <tbody>
              <tr>
                <td style={{ padding: 10 }}>Id</td>
                <td style={{ padding: 10 }}>Nome</td>
                <td style={{ padding: 10 }}>E-mail</td>
                <td style={{ padding: 10 }}>CPF</td>
                <td style={{ padding: 10 }}>Endereço</td>
                <td style={{ padding: 10 }}>Data de Nascimento</td>
                <td style={{ padding: 10 }}>Telefone</td>
                <td style={{ padding: 10 }}>Observação</td>
                <td colspan="2"></td>
              </tr>

              {data
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (
                    ("" + post.name)
                      .toLowerCase()
                      .includes(("" + query).toLowerCase())
                  ) {
                    return post;
                  }
                })
                .slice(0, 10)
                .map((post, index) => (
                  <tr key={post.id}>
                    <td style={{ padding: 10 }}>{post.id}</td>
                    <td style={{ padding: 10 }}>{post.name}</td>
                    <td style={{ padding: 10 }}>{post.email}</td>
                    <td style={{ padding: 10 }}>{post.cpf}</td>
                    <td style={{ padding: 10 }}>{post.address}</td>
                    <td style={{ padding: 10 }}>{post.birth}</td>
                    <td style={{ padding: 10 }}>{post.phone}</td>
                    <td style={{ padding: 10 }}>{post.note}</td>
                    <td>
                      <Button
                        onClick={() =>
                          (window.location.href = `/edit/${post.id}`)
                        }
                        type="link"
                      >
                        Editar
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteUser(post.id)} type="link">
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
        {
          // Utilizei a table do antd, ela ja limita em 10, mas se quisesse utilizar o map para puxar os dados, era só utilizar o slice para limitar: slice(0,10)
        }
      </Col>
    </Row>
  );
};

const createForm = Form.create({
  name: "ListUsers",
})(ListUsers);
export default createForm;
