const url = process.env.REACT_APP_CLOUDNARY_NAME;

const uploadImgCloudnary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "arakcart-product");

  const dataResponce = await fetch(url, {
    method: "post",
    body: formData,
  });
  return dataResponce.json();
};
