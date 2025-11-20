import React from "react";
import { Col, Row, Card, Typography } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const { Title, Text } = Typography;

// Random images
const randomImages = [
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xrp.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/doge.png",
];

const News = ({ simplified }) => {
  const count = simplified ? 10 : 10;

  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "crypto",
  });

  if (isFetching) return <Loader />;

  const newsList = data?.data?.slice(0, count) || [];

  return (
    <div style={{ padding: "20px", marginLeft: "250px" }}>
      {!simplified && <h1>Latest Crypto News</h1>}

      <Row gutter={[24, 24]}>
        {newsList.map((news, i) => {
          const randomImage =
            randomImages[Math.floor(Math.random() * randomImages.length)];

          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card
                hoverable
                style={{
                  padding: "15px",
                  borderRadius: "14px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0,0,0,0.20)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 10px rgba(0,0,0,0.08)";
                }}
              >
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div style={{ display: "flex", marginBottom: "12px" }}>
                    <img
                      src={randomImage}
                      alt="news"
                      style={{
                        width: "85px",
                        height: "85px",
                        marginRight: "15px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />

                    <Title level={4} style={{ margin: 0 }}>
                      {news.title}
                    </Title>
                  </div>

                  <p style={{ color: "#444", marginBottom: "12px" }}>
                    {news.description?.substring(0, 120)}...
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#777",
                      fontSize: "12px",
                    }}
                  >
                    <Text>{news.source_name}</Text>
                    <Text>
                      {moment(news.published_at).format("DD MMM YYYY, hh:mm A")}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default News;

