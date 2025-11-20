// src/components/Cryptodetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import LineChart from "./LineChart";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/CryptoApi";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const Cryptodetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <h2 style={{ marginLeft: "250px" }}><Loader /></h2>;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    { title: "Price to USD", value: `$ ${millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: "24h Volume", value: `$ ${millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: "Market Cap", value: `$ ${millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: "All-time-high", value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: "Number Of Markets", value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: "Number Of Exchanges", value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: "Approved Supply", value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: "Total Supply", value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: "Circulating Supply", value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col style={{ marginLeft: "250px", padding: "20px" }}>
      
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>{cryptoDetails.name} live price and market statistics.</p>
      </Col>

      <Select
        defaultValue="7d"
        className="select-timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {/* CHART FIXED */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      {/* STATS */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Value Statistics
          </Title>

          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Title level={3} className="coin-details-heading">Other Stats</Title>

          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      {/* DESCRIPTION */}
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3}>What is {cryptoDetails.name}?</Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>

        <Col className="coin-links">
          <Title level={3}>{cryptoDetails.name} Links</Title>

          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5}>{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Cryptodetails;



