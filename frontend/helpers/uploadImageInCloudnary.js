const url = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const uploadImgCloudnary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "arakcart-product");

  const dataResponce = await fetch(url, {
    method: "post",
    body: formData,
  });
  return await dataResponce.json();
};

export default uploadImgCloudnary;
