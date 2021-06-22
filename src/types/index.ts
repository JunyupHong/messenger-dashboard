export interface Legend_T {
  name: string;
  active: boolean;
  color: string;
}

export interface Server_T {
  conn_date: string;
  conn_hours: number;
  id: string;
  max_user: number;
  server_ip: string;
  serverinfo_uid: string;
}

export interface ChartData_T {
  datasets: Array<{
    label: string;
    data: Number[];
    borderColor: string;
    backgroundColor: string;
  }>;
  labels: Array<Number>;
}
