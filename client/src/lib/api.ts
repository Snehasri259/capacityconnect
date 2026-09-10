import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1', timeout: 12000 });
api.interceptors.request.use(config => {
  const token=localStorage.getItem('cc_token');
  if(token) config.headers.Authorization=`Bearer ${token}`;
  return config;
});
export async function get<T>(url:string, params?:Record<string,unknown>){ return (await api.get<{success:boolean;data:T}>(url,{params})).data.data; }
export async function post<T>(url:string,data?:unknown){ return (await api.post<{success:boolean;data:T}>(url,data)).data.data; }
export async function put<T>(url:string,data?:unknown){ return (await api.put<{success:boolean;data:T}>(url,data)).data.data; }
