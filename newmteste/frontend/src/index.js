import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Layout } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import Routes from './routes/routes';

ReactDOM.render(
  <Layout>
  <ConfigProvider locale={ptBR}>
    <Routes />
  </ConfigProvider>
</Layout>,
  document.getElementById('root')
);

