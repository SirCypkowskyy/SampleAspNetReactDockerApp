/**
 * User type
 * @property {number} id - User id
 * @property {string} username - User username
 * @property {string} email - User email
 * @property {boolean} isAdmin - User admin status
 * @property {string} avatarUrl - User avatar url
 */
export type User = {
    id?: number | null;
    username: string | null;
    email: string | null;
    isAdmin: boolean;
    avatarUrl?: string;
}

/**
 * Login request type
 * @property {string} email - User email
 * @property {string} password - User password
 */
export type LoginRequest = {
    email: string;
    password: string;
}


/**
 * Weather forecast type
 * @property {string || null} date - Date
 * @property {number || null} temperatureC - Temperature in Celsius
 * @property {number || null} temperatureF - Temperature in Fahrenheit
 * @property {string || null} summary - Summary
 */
export type WeatherForecast = {
    /** Format: date */
    date?: string;
    /** Format: int32 */
    temperatureC?: number;
    /** Format: int32 */
    temperatureF?: number;
    summary?: string | null;
};

