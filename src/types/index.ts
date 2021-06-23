export type Legend_T = {
  name: string;
  active: boolean;
  color: string;
};

export type Server_T = {
  conn_date: string;
  conn_hours: number;
  id: string;
  max_user: number;
  server_ip: string;
  serverinfo_uid: string;
};

export type ChartData_T = {
  datasets: Array<{
    label: string;
    data: Array<number>;
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }>;
  labels: Array<number>;
};
