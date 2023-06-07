import { groq } from "next-sanity";
import { client } from "../lib/client";

export const bannerQuery = groq`
*[_type == "banner"]
`;

export const fetchBannerData = async () => {
  const bannerData = await client.fetch(bannerQuery);
  return bannerData;
};
