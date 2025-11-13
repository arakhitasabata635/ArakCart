
import apiSummary from "../common";

const deleteImageFromCloudnary = async (public_id) => {
  const fetchRes = await fetch(apiSummary.delImgCloudnary.url, {
    method: apiSummary.delImgCloudnary.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ public_id }),
  });
  return await fetchRes.json();

  
};

export default deleteImageFromCloudnary;
