import { config as loadConfig } from "dotenv";

loadConfig({
    path: ".env"
})

const config = {
    PORT: parseInt(process.env.PORT) || 4000,
    AWS: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_KEY,
        BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
        REGION: process.env.AWS_REGION
    }
}

export default config;