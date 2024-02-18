import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sets the auth token in local storage
 * @param token - The token to set
 */
export function setAuthToken(token: string) {
    localStorage.setItem('token', token);
}

/**
 * Removes the auth token from local storage
 */
export function removeAuthToken() {
    localStorage.removeItem('token');
}

/**
 * Gets the auth token from local storage
 */
export function getToken() {
    return localStorage.getItem('token');
}

/**
 * Sets the refresh token in local storage
 * @param token - The token to set
 */
export function setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
}

/**
 * Removes the refresh token from local storage
 */
export function removeRefreshToken() {
    localStorage.removeItem('refreshToken');
}

/**
 * Gets the refresh token from local storage
 */
export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}
