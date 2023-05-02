import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellersData(data);
    }

    fetchData();
  }, []);

  console.log(topSellersData);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellersData.map((elem) => (
                    <li key={elem.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${elem.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={elem.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${elem.authorId}`}>
                          {elem.authorName}
                        </Link>
                        <span>{elem.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;