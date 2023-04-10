import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload");

  try {
    // const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/kaytech2/image/upload",
      data, {
        withCredentials: true,
        headers: { 
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    );
    

    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default upload;
