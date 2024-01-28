// controllers/secret.controller.js
import accessSecret from '../utils/secret.js';

export const getSecret = async (req, res) => {
    try {
        const secret = await accessSecret();
        res.send(secret);
    } catch (err) {
        console.error('Error retrieving secret:', err);
        res.status(500).send('Error retrieving secret');
    }
};
