import { groq } from "next-sanity";
import { client } from "../lib/client";

export const query = groq`
*[_type == "product"]
`;

export const fetchProducts = async () => {
  const products = await client.fetch(query);
  return products;
};

export const slugQuery = groq`
*[_type == "product"] {
  "slug": slug.current
}`;

export const getSlug = async () => {
  const query = `*[_type == "product"] {
    "slug": slug.current
  }`;
  const products = await client.fetch(query);

  console.log(products);

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
