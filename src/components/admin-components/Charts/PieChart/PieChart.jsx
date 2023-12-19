import { useSelector } from "react-redux";
import styles from "./PieChart.module.scss";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(Title, Tooltip, Legend);

const PieChart = () => {
  const [labels, setLabels] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    try {
      axios
        .get(`https://vintage-wine-nyw6.onrender.com/api/catalog/`)
        .then((response) => {
          const labels = response.data.map((item) => item.name);
          setLabels(labels);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://vintage-wine-nyw6.onrender.com/api/orders/all", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getCatalogData = (catalog) => {
    const mon = orderData.map((item) => {
      return item.products.map((product) => {
        if (catalog.toLowerCase() === product.instance.categories) {
          return {
            category: product.instance.categories,
            quantity: product.quantity,
          };
        } else {
          return {
            category: product.instance.categories,
            quantity: 0,
          };
        }
      });
    });
    const obj = [].concat(...mon);

    return obj.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "# of Products",
        data: labels.map((label, i) => getCatalogData(label)),
        backgroundColor: [
          "rgba(31, 139, 49, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(190, 6, 21, 0.5)",
          "rgba(234, 255, 0, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(31, 139, 49, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(234, 255, 0, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
      <h2 className={styles.PieChartTitle}>Sales by category</h2>
    </div>
  );
};

export default PieChart;
