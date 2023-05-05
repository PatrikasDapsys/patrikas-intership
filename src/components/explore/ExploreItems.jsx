import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [exploreItemsData, setExploreItemsData] = useState([]);
  const [totalLoaded, setTotalLoaded] = useState(8);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (selectedOption) {
        setIsLoading(false);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedOption}`
        );
        setExploreItemsData(data);
        setIsLoading(true);
      } else {
        setIsLoading(false);
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setExploreItemsData(data);
        setIsLoading(true);
      }
    }

    fetchData();
  }, [selectedOption]);

  function loadMoreNft() {
    setTotalLoaded(totalLoaded + 4);
    if (exploreItemsData.length <= totalLoaded + 4) {
      setShowLoadMoreButton(false);
    }
  }

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading
        ? exploreItemsData.slice(0, totalLoaded).map((elem) => (
            <div
              key={elem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard
                key={elem.id}
                authorId={elem.authorId}
                authorImage={elem.authorImage}
                nftImage={elem.nftImage}
                nftId={elem.nftId}
                title={elem.title}
                price={elem.price}
                likes={elem.likes}
                expiryDate={elem.expiryDate}
              />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item" key={index}>
                <div className="author_list_pp author_list_pp--skeleton skeleton-box"></div>
                <div className="nft__item_wrap skeleton-box"></div>
                <div className="nft__item_info nft__item_info--skeleton skeleton-box"></div>
                <br />
                <div
                  className="nft__item_info nft__item_info--skeleton skeleton-box"
                  style={{ width: "40%" }}
                ></div>
                <div className="nft__item_like nft__item_like--skeleton skeleton-box"></div>
              </div>
            </div>
          ))}
      {showLoadMoreButton ? (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              loadMoreNft();
            }}
          >
            Load more
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ExploreItems;
