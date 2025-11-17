import React ,{useState}from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col,Row,Typography,Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery,  } from '../services/CryptoApi';

/*import Loader from './Loader';
import LineChart from './LineChart';*/
const { Title,Text }=Typography;
const { option } =Select;
const Cryptodetails = () => {
    const { coinId }=useParams();
    const [timePeriod,setTimePeriod]=useState('7d')
  return (
    <div style={{
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "5vh",
        maxHeight: "7vh"
      }}>
      Cryptodetails {coinId}
    </div>
  )
}

export default Cryptodetails
