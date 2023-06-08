import { client } from "../lib/client";
import React, { useState } from "react";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  const [search, setSearch] = useState("");

  const filteredProd = products.filter((prod) =>
    prod.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling</h2>
        <p></p>
      </div>
      <div className="product-search">
        <input
          className="product-search-input"
          value={search}
          onChange={handleInputChange}
          placeholder="Search"
        ></input>
      </div>
      <div className="products-container">
        {filteredProd?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
