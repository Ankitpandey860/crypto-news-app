import React from "react";
import millify from "millify";
import { Typography,Row,Col,Statistic, Flex } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/CryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";


const {Title}=Typography;
const Homepage = () => {
  const { data, isFetching}=useGetCryptosQuery(10);
  

  const globalstats=data?.data?.stats;
  if(isFetching) return <Loader />;
  return (
    
    <>
    <Title level={2} className="heading" style={{paddingLeft:"300px",
       display: "flex",
      flexWrap: "wrap",
    }}>
        Global crypto stats
    </Title>
    <Row  style={{paddingLeft:"300px",
       display: "flex",
      flexWrap: "wrap",
      maxWidth:"1000px",
      minWidth:"700px",
    }}>
      <Col span={12}>
      <Statistic title="Total Currencies" value={globalstats.total} />
      <Statistic title="Total Exchanges" value={millify(globalstats.totalExchanges)} />
      <Statistic title="Total Market Cap" value={`$${millify(globalstats?.totalMarketCap)}`} />
      <Statistic title="Total 24h volume" value={millify(globalstats?.total24hVolume)} />
      <Statistic title="Total markets" value={millify(globalstats.totalMarkets)} />
      
      </Col>
    </Row>
    <div className="Home-heading-container"
      style={{
        paddingLeft:"300px"
      }}>
      <Title level={2} className="home-title">
        Top 10 Cryptocurrencies
      </Title>
      <Title level={3} className="show-more">
        <Link to="/Cryptocurrencies">show more </Link>
      </Title>
    </div>
    <Cryptocurrencies simplified />



    <div className="Home-heading-container"
      style={{
        paddingLeft:"300px"
      }}>
      <Title level={2} className="home-title">
        Latest Crypto News
      </Title>
      <Title level={3} className="show-more">
        <Link to="/News">show more </Link>
      </Title>
    </div>
    <News simplified />
    </>
  );
};

export default Homepage;

