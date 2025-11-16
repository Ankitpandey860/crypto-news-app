import React from "react";
import { Col, Row, Card, Typography } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Title, Text } = Typography;

// 100% working image URLs (NO CORS ISSUE)
const randomImages = [
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xrp.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ada.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/doge.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/dot.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ltc.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/trx.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/shib.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xlm.png",
  "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/uni.png",
];

const News = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "crypto",
  });

  if (isFetching) return <h2 style={{ marginLeft: "250px" }}>Loading News...</h2>;

  // API data array
  const newsList = data?.data?.slice(0, count) || [];

  return (
    <div style={{ padding: "20px", marginLeft: "250px" }}>
      

      <Row gutter={[24, 24]}>
        {newsList.map((news, i) => {
          const randomImage =
            randomImages[Math.floor(Math.random() * randomImages.length)];

          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              {/* CARD START */}
              <Card
                hoverable
                className="news-card"
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
                  {/* IMAGE + TITLE */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <img
                      src={randomImage}
                      alt="news"
                      style={{
                        width: "85px",
                        height: "85px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        marginRight: "15px",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.15)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />

                    <Title level={4} style={{ margin: 0 }}>
                      {news.title}
                    </Title>
                  </div>

                  {/* DESCRIPTION */}
                  <p style={{ color: "#444", marginBottom: "12px" }}>
                    {news.description?.length > 120
                      ? news.description.substring(0, 120) + "..."
                      : news.description}
                  </p>

                  {/* FOOTER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#777",
                      fontSize: "12px",
                    }}
                  >
                    <Text>{news.source_name}</Text>
                    <Text>{moment(news.published_at).format("DD MMM YYYY, hh:mm A")}</Text>
                  </div>
                </a>
              </Card>
              {/* CARD END */}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default News;