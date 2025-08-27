const upload = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "unsigned_profile_pics")
    data.append("cloud_name", "dchfqxvef")

    const res = await fetch("https://api.cloudinary.com/v1_1/dchfqxvef/image/upload", {
        method: "POST",
        body: data
    })

    const resJson = await res.json()
    const uploadedImageURL = resJson.url;
    return uploadedImageURL;
}

export default upload;