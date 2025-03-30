import axios from "axios";

const API_URL = "http://localhost:5000/api";
      // @ts-ignore
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData: { email: string; password: string; }) => axios.post(`${API_URL}/auth/login`, userData);

export const generateResume = (resumeData: any, token: any) => 
  axios.post(`${API_URL}/resumes/generate`, resumeData, {
    headers: { Authorization: token },
  });

export const getResumes = (token: string | null) => 
  axios.get(`${API_URL}/resumes`, { headers: { Authorization: token } });

export const deleteResume = (id: any, token: any) => 
  axios.delete(`${API_URL}/resumes/${id}`, { headers: { Authorization: token } });
