import React from 'react';
import { Layout } from 'antd';

import { Header, Footer } from './components';
import Router from './router/Router';

const App = () => {
  return (
    <Layout className='app'>
      <Header />
      <Layout>
        <Router />
        <Footer />
      </Layout>
    </Layout>
  )
}

export default App