import axios from "./axios";

export async function getSignedUrlRequest({ key, content_type }) {
    const response = await axios.post("/s3/signed_url", {
        key,
        content_type,
    });

    return response.data;
}

export async function uploadFileToSignedUrlRequest(
    signedUrl,
    file,
    contentType,
    onProgress,
    onComplete
) {
    axios
        .put(signedUrl, file, {
            onUploadProgress: onProgress,
            headers: {
                "Content-Type": contentType,
            },
        })
        .then((response) => {
            onComplete(response);
        })
        .catch((err) => {
            console.error(err);
        })
}
