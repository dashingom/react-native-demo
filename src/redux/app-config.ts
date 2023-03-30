export const config: Config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  apiUrl: process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  apiVersion: process.env.REACT_APP_API_VERSION || '2.0',
};

export type Config = {
  apiUrl: string;
  apiVersion: string;
};
