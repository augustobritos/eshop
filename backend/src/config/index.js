import accessSecret from "../utils/secret.js";

const getConfigFromSecret = async (secretName) => {
  try {
    const data = await accessSecret(secretName);
    const response = JSON.parse(data);
    return response;
  } catch (err) {
    console.error(`Error while retrieving ${secretName} configuration:`, err);
    return null;
  }
};

export const getAwsConfig = async () => {
  const response = await getConfigFromSecret("AWS");

  if (!response) return null;

  const AWS = response;

  return {
    AWS: {
      ACCESS_KEY_ID: AWS?.ACCESS_KEY_ID || null,
      SECRET_ACCESS_KEY: AWS?.SECRET_KEY || null,
    },
  };
};

export const getMercadoPagoConfig = async () => {
  const response = await getConfigFromSecret("MERCADO_PAGO");

  if (!response) return null;

  return {
    MP: {
      ACCESS_TOKEN: response.MP?.ACCESS_TOKEN || null,
    },
  };
};

export const getDatabaseconfig = async () => {
  const response = await getConfigFromSecret("DB_CONFIG");

  if (!response) return null;

  return {
    DB: {
      CREDENTIALS: response || null,
    },
  };
};
