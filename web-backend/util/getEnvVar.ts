export const getEnvVar = (key: string) => {
  const envVar = process.env[key];
  if (!envVar) {
    throw Error(`Could not get ${key}.`);
  }
  return envVar;
};
