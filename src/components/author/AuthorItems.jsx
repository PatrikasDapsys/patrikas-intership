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