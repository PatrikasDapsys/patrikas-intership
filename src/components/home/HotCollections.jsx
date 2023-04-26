import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HotCollections = () => {
  const [collectionsData, setCollectionsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollectionsData(data);
    }

    fetchData();
  }, []);

  console.log(collectionsData)

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {collectionsData.map((elem) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
              key={elem.id}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${elem.nftId}`}>
                    <img
                      src={elem.nftImage}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${elem.authorId}`}>
                    <img
                      className="lazy pp-coll"
                      src={elem.authorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{elem.title}</h4>
                  </Link>
                  <span>ERC-{elem.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
