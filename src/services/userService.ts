import { toast } from 'react-toastify';

import jwtDecode from 'jwt-decode';

import { apiUrl } from '../config.json';
import { LoginArgs } from '../interfaces/loginArgs';
import httpService from './httpService';

const tokenKey = 'localData';

export function getCurrentUser(): { [x: string]: any } | null {
  try {
    const localData = JSON.parse(localStorage.getItem(tokenKey) || 'null');
    return { ...jwtDecode(localData.token), name: localData.name };
  } catch (error) {
    return null;
  }
}

export async function login({ email, password }: LoginArgs): Promise<void> {
  const { data } = await httpService.post(`${apiUrl}/auth`, {
    email,
    password,
  });
  if (!data.isPainter) {
    toast.success(`Logging in...`, {
      position: 'top-center',
      autoClose: 2000,
    });
  }

  localStorage.setItem(tokenKey, JSON.stringify(data));
}

export async function logout(): Promise<void> {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUserDetails(): { [x: string]: any } | null {
  try {
    return httpService.get(`${apiUrl}/users/me`);
  } catch (error) {
    return null;
  }
}
export function addFavorite(
  drawingNum: number | string
): { [x: string]: any } | null {
  try {
    return httpService.patch(`${apiUrl}/users/add-favorite`, {
      drawings: [drawingNum],
    });
  } catch (error) {
    return null;
  }
}
export function removeFavorite(
  drawingNum: number | string
): { [x: string]: any } | null {
  try {
    return httpService.patch(`${apiUrl}/users/delete-favorite`, {
      drawings: [drawingNum],
    });
  } catch (error) {
    return null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
};
