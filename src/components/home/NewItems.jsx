import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Countdown from "../UI/Countdown";
import NftCard from "../UI/NftCard";

const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState([]);
  const owlCarouselOptions = {
    nav: true,
    loop: true,
    items: "4",
    dots: false,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },

      768: {
        items: 3,
      },
      1080: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItemsData(data);
    }

    fetchData();
  }, [newItemsData.length]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItemsData.length ? (
            <OwlCarousel {...owlCarouselOptions}>
              {newItemsData.map((elem) => (
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
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
              {new Array(5).fill(0).map((_, index) => (
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
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};
export default NewItems;

{
  /* <div className="nft_coll nft__coll--skeleton" key={index}>
<div className="nft_wrap lazy nft_wrap--skeleton skeleton-box"></div>
<div className="nft_coll_pp">
  <div className="lazy pp-coll pp__coll--skeleton skeleton-box"></div>
  <i className="fa fa-check"></i>
</div>
<div className="nft_coll_info nft_coll_info--skeleton">
  <h4 className="skeleton-box"></h4>
  <span className="skeleton-box"></span>
</div>
</div> */
}
