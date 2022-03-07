import { Row, Col, Form, Input, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import NewM from "../images/logo-new-m.svg";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";
import { useParams } from "react-router-dom";

const EditUser = (props) => {
  const { getFieldDecorator, getFieldValue } = props.form;
  const [data, setData] = useState([{}]);

  const { id } = useParams();

  const detailUser = (id) => {
    var formData = new FormData();

    formData.append("id", id);
    axios
      .post("http://localhost/newmteste/backend/api/detailuser.php", formData)
      .then((res) => {
        setData(res.data[0]);
      });
  };
  const editUser = () => {
    var formData = new FormData();

    var regex = /[ a-zA-ZÁÉÍÓÚáéíóúâêîôûàèìòùÇç]+$/;

    if (getFieldValue("name").match(regex)) {
      formData.append("id", data.id);
      formData.append("name", getFieldValue("name"));
      formData.append("email", getFieldValue("email"));
      if (!cpf.isValid(getFieldValue("cpf"))) {
        message.error("CPF inválido!");
        return;
      }
      formData.append("cpf", getFieldValue("cpf"));
      formData.append("phone", getFieldValue("phone"));
      formData.append("address", getFieldValue("address"));
      if (getFieldValue("note") == undefined) {
        formData.append("note", "Sem observação");
      } else {
        formData.append("note", getFieldValue("note"));
      }

      formData.append("birth", getFieldValue("birth"));

      axios.post(
        "http://localhost/newmteste/backend/api/edituser.php",
        formData
      );
      message.success("Editado com sucesso!");
      window.location.href = "/users"
    } else {
      message.error("Por favor, insira somente letras no campo nome!");
    }
  };

  useEffect(() => {
    detailUser(id);
  }, []);

  return (
    <Row style={{ minHeight: "100vh", backgroundColor: "#CCC" }}>
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
              <a style={{ color: "#FFF" }} href="/users">
                Listar Usuários
              </a>
            </Button>
          </Col>
        </Col>
      </Col>
      <Col xs={0} md={24} xl={24} style={{ marginTop: 50 }}></Col>
      <Col xs={24} md={0} xl={0} style={{ marginTop: 25 }}></Col>
      <Col xs={24} md={24} xl={24}>
        <Col xs={4} md={4} xl={9}></Col>
        <Col
          xs={16}
          md={16}
          xl={6}
          style={{ backgroundColor: "#FFF", padding: 15, borderRadius: 5 }}
        >
          <Col
            xs={24}
            md={24}
            xl={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span style={{ fontSize: 24, fontWeight: 500, color: "#000" }}>
              Editar Usuário
            </span>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <Form>
              <Col xs={24} md={24} xl={24}>
                <Form.Item label="Nome">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, insira seu nome.",
                      },
                    ],
                    initialValue: data.name,
                  })(<Input placeholder="Insira seu nome" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <Form.Item label="E-mail">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, insira seu e-mail.",
                      },
                    ],
                    initialValue: data.email,
                  })(<Input placeholder="Insira seu e-mail" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <Form.Item label="CPF">
                  {getFieldDecorator("cpf", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, insira seu CPF.",
                      },
                    ],
                    initialValue: data.cpf,
                  })(<Input placeholder="___.___.___-__" maxLength={11} />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <Form.Item label="Endereço">
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, insira seu endereço.",
                      },
                    ],
                    initialValue: data.address,
                  })(<Input placeholder="Insira seu endereço" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <Col xs={24} md={11} xl={11}>
                  <Form.Item label="Data de Nascimento">
                    {getFieldDecorator("birth", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, insira sua data de nascimento.",
                        },
                      ],
                      initialValue: data.birth,
                    })(<Input placeholder="DD/MM/YYYY"  maxLength={10}  />)}
                  </Form.Item>
                </Col>
                <Col xs={0} md={2} xl={2}></Col>
                <Col xs={24} md={11} xl={11}>
                  <Form.Item label="Telefone">
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          required: true,
                          message:
                            "Por favor, insira o número do seu telefone.",
                        },
                      ],
                      initialValue: data.phone,
                    })(<Input placeholder="(__) XXXXXXXXX" maxLength={11} />)}
                  </Form.Item>
                </Col>

                <Col xs={24} md={24} xl={24}>
                  <Form.Item label="Observação">
                    {getFieldDecorator("note", {
                      rules: [
                        {
                          required: false,
                        },
                      ],
                      initialValue: data.note,
                    })(<TextArea placeholder="Observação" maxLength={300} />)}
                  </Form.Item>
                </Col>
              </Col>
              <Col
                xs={24}
                md={24}
                xl={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{ backgroundColor: "#016ca5" }}
                  size="large"
                  type="primary"
                  onClick={() => editUser()}
                >
                  Salvar
                </Button>
              </Col>
            </Form>
          </Col>
        </Col>
        <Col xs={4} md={4} xl={9}></Col>
      </Col>
    </Row>
  );
};

const createForm = Form.create({
  name: "edituser",
})(EditUser);
export default createForm;
