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
  try {
    const response = await getConfigFromSecret("AWS");
    console.log(response.AWS); // logs credentials OK

    if (!response || !response.AWS.ACCESS_KEY_ID || !response.AWS.SECRET_KEY) {
      throw new Error("Invalid AWS configuration");
    }

    return {
      AWS: {
        ACCESS_KEY_ID: response.AWS.ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: response.AWS.SECRET_KEY,
      },
    };
  } catch (error) {
    console.error("Error fetching AWS configuration:", error);
    return null;
  }
};

export const getMercadoPagoConfig = async () => {
  try {
    const response = await getConfigFromSecret("MERCADO_PAGO");
    
    if (!response) return null;

    return {
      MP: {
        ACCESS_TOKEN: response.MP?.ACCESS_TOKEN || null,
        PUBLIC_KEY: response.MP?.PUBLIC_KEY || null,
      },
    };
  } catch (error) {
    console.error("Error fetching configuration from secret:", error);
    return null;
  }
};

export const getDatabaseconfig = async () => {
  try {
    const response = await getConfigFromSecret("DB_CONFIG");

    if (!response) {
      return null;
    }

    return {
      DB: {
        CREDENTIALS: response || null,
      },
    };
  } catch (error) {
    console.error("Error fetching configuration from secret:", error);
    return null;
  }
};
