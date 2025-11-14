import React from "react";
import { useParams } from "react-router-dom";

const CategoryProductPage = () => {
  const { categoryName } = useParams();
  return <div>{categoryName}</div>;
};

export default CategoryProductPage;
