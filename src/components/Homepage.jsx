import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/CryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  // SAFE ACCESS (FIX)
  const globalStats = data?.data?.stats;

  if (isFetching || !globalStats) return <Loader />;

  return (
    <>
      {/* GLOBAL STATS */}
      <Title
        level={2}
        className="heading"
        style={{
          paddingLeft: "300px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        Global Crypto Stats
      </Title>

      <Row
        style={{
          paddingLeft: "300px",
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1000px",
          minWidth: "700px",
        }}
      >
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
          <Statistic
            title="Total Market Cap"
            value={`$${millify(globalStats.totalMarketCap)}`}
          />
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>

      {/* TOP 10 */}
      <div
        className="Home-heading-container"
        style={{ paddingLeft: "300px" }}
      >
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/Cryptocurrencies">Show more</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified />

      {/* NEWS */}
      <div
        className="Home-heading-container"
        style={{ paddingLeft: "300px" }}
      >
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/News">Show more</Link>
        </Title>
      </div>

      <News simplified />
    </>
  );
};

export default Homepage;

