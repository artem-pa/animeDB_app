import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { Header, Homepage, Page404, Footer } from './components';
import './style.css'

const App = () => {
  return (
    <Layout className='app'>
      <Header />
      <Layout>
        <main >
          <Routes>
            <Route exact path='/' element={<Homepage />} />

            <Route path='*' element={<Page404 />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Layout>
    </Layout>
  )
}

export default App