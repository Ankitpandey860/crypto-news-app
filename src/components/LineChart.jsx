import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Typography } from 'antd';
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // Extract data
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

   const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Col>
      <Title level={2}>
        {coinName} Price Chart (USD)
      </Title>
      <Title level={5}>Current Price: ${currentPrice}</Title>

      <div style={{ height: "350px" }}>
        <Line data={data} options={options} />
      </div>
    </Col>
  );
};

export default LineChart;
    
