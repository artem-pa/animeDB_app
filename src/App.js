import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { Header, Homepage, Page404, Footer, AnimeItem, MangaItem } from './components';
import './style.css'
import News from './components/News/News';

const App = () => {
  return (
    <Layout className='app'>
      <Header />
      <Layout>
        <main >
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/anime/:itemId' element={<AnimeItem />} />
            <Route exact path='/manga/:itemId' element={<AnimeItem manga />} />
            <Route path='/news' element={<News />} />

            <Route path='*' element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default App