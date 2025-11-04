const imageToBase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.oneerr = (err) => reject(err);
  });

  return data ;
};
export default imageToBase64 ;