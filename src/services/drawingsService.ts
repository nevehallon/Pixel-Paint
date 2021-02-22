import { AxiosResponse } from 'axios';

import { apiUrl } from '../config.json';
import { Drawing } from '../interfaces/Drawing';
import http from './httpService';

export function createDrawing(drawing: Drawing): Promise<AxiosResponse<any>> {
  return http.post(`${apiUrl}/drawings`, drawing);
}

export function getMyDrawings(): Promise<AxiosResponse<any>> {
  return http.get(`${apiUrl}/drawings/my-drawings`);
}

export function getDrawing(id: string): Promise<AxiosResponse<any>> {
  try {
    return http.get(`${apiUrl}/drawings/${id}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

export function deleteDrawing(id: string): Promise<AxiosResponse<any>> {
  try {
    return http.delete(`${apiUrl}/drawings/${id}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

export function editDrawing(drawing: Drawing): Promise<AxiosResponse<any>> {
  try {
    const { _id, ...data } = drawing;
    return http.put(`${apiUrl}/drawings/${_id}`, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createDrawing,
  getMyDrawings,
  getDrawing,
  editDrawing,
  deleteDrawing,
};
