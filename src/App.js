import React from 'react'
import { Switch,Route,Link, Routes } from 'react-router-dom';
import { Layout,Typography,Space } from 'antd';
import { Navbar ,Exchanges,Homepage,Cryptocurrencies,Cryptodetails,News} from './components'
import './App.css'

const App = () => {
  return (
    <div className='App'>
        <div className='navbar'>
            <Navbar/>
        </div>
        <div className='main'>
            <Layout>
              <div className='routes'>
                
                  <Routes>
                      
                      <Route path="/" element={<Homepage />} />
                      <Route path='/Exchanges' element={<Exchanges />} />
                      <Route path='/Cryptocurrencies' element={<Cryptocurrencies />} />
                     <Route path="/crypto/:coinId" element={<Cryptodetails />} />
                      
                      <Route path='/News' element={<News />} />

                  </Routes>
                    
                  
              </div>
            </Layout>
        
          <div className='footer'>
            <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
              Cryptoverse<br />
              all rights reserved
            </Typography.Title>
            <Space>
                <Link to="/">Home</Link>
                <Link to="/Exchanges">Exchanges</Link>
                <Link to="/News">News</Link>
            </Space>
          </div>
        </div>
    </div>
  )
}

export default App
