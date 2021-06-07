import axios from 'axios';

const baseURL = 'https://dev-msgr-statistics-api.hiworks.com/v1/statistics';
const getDateQuery = date => `/today/${date}`;
const getPeriodQuery = (startDate, endDate) => `/term/start-date/${startDate}/end-date/${endDate}`;

const fetchDate = async date => {
  try {
    const response = await axios.get(baseURL + getDateQuery(date));
    return response.data;
  } catch (e) {
    throw new Error(` ${e.message}\nFetch Date : ${baseURL + getDateQuery(date)}`);
  }
};

const fetchPeriod = async (startDate, endDate) => {
  try {
    const response = await axios.get(baseURL + getPeriodQuery(startDate, endDate));
    return response.data;
  } catch (e) {
    throw new Error(`${e.message}\nFetch Period : ${baseURL + getPeriodQuery(startDate, endDate)}`);
  }
};

export { fetchDate, fetchPeriod };

export default {
  fetchDate,
  fetchPeriod,
};
