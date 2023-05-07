import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ authorData }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!!authorData.nftCollection
            ? authorData.nftCollection.map((elem) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={elem.id}
                >
                  <NftCard
                    key={elem.id}
                    authorId={authorData.authorId}
                    authorImage={authorData.authorImage}
                    nftImage={elem.nftImage}
                    nftId={elem.nftId}
                    title={elem.title}
                    price={elem.price}
                    likes={elem.likes}
                  />
                </div>
              ))
            : new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;

{
  /* <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={elem.id}>
  <div className="nft__item">
    <div className="author_list_pp">
      <Link to="">
        <img className="lazy" src={authorData.authorImage} alt="" />
        <i className="fa fa-check"></i>
      </Link>
    </div>
    <div className="nft__item_wrap">
      <div className="nft__item_extra">
        <div className="nft__item_buttons">
          <button>Buy Now</button>
          <div className="nft__item_share">
            <h4>Share</h4>
            <a href="" target="_blank" rel="noreferrer">
              <i className="fa fa-facebook fa-lg"></i>
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <i className="fa fa-twitter fa-lg"></i>
            </a>
            <a href="">
              <i className="fa fa-envelope fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <Link to="/item-details">
        <img src={elem.nftImage} className="lazy nft__item_preview" alt="" />
      </Link>
    </div>
    <div className="nft__item_info">
      <Link to="/item-details">
        <h4>{elem.title}</h4>
      </Link>
      <div className="nft__item_price">{elem.price} ETH</div>
      <div className="nft__item_like">
        <i className="fa fa-heart"></i>
        <span>{elem.likes}</span>
      </div>
    </div>
  </div>
</div>; */
}
