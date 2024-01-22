import Router from "express-promise-router";
import createPresignedPost from "../utils/s3.js";



const s3Router = Router();

s3Router.post('/signed_url', async (req, res) => {

    try {
        let { key, content_type } = req.body;
        key = 'public/' + key;
        
        const data = await createPresignedPost({ key, contentType: content_type })

        return res.send({
            status: 'success',
            data,
        })

    } catch (error) {
        
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: err.message,
        })
    }
})

export default s3Router