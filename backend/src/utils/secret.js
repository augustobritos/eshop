import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

async function accessSecret(secretName) {

  const projectNumber = "1015347625030";

  try {
    // Validate input parameter
    if (!secretName || typeof secretName !== 'string') {
      throw new Error('Invalid secret name');
    }

    const client = new SecretManagerServiceClient();
    const secretFullName = `projects/${projectNumber}/secrets/${secretName}/versions/latest`;

    const [version] = await client.accessSecretVersion({
      name: secretFullName,
    });

    const payload = version.payload.data.toString("utf8");

    return payload;
  } catch (error) {
    console.error("Error accessing secret:", error);
    throw error; // Re-throw the error for handling by the caller
  }
}

export default accessSecret;
