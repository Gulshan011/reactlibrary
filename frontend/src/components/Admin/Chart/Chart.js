
  

// export default Chart
import React, { useEffect, useState } from 'react';
import './chart.css';
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/auth/booklist');
      const json = await response.json();

      // Aggregate data by month
      const monthData = json.data.reduce((acc, issue) => {
        const month = issue.issuedDate.slice(0, 7);
        if (!acc[month]) {
          acc[month] = {
            name: month,
            Total: 0,
          };
        }
        acc[month].Total += 1;
        return acc;
      }, {});

      // Create array of last six months, with 0 values for missing data
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(sixMonthsAgo);
        date.setMonth(date.getMonth() + i);
        return date.toISOString().slice(0, 7);
      });
      const sixMonthData = months.map((month) => monthData[month] || { name: month, Total: 0 });

      setData(sixMonthData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="chart">
      <div className="title">Last Six months desc</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={700}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="purple" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
