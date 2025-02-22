import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftID } = useParams();
  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchData() {
      setIsLoading(false);
      const { data } = await axios.get(`
      https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftID}
      `);

      setNftData(data);
      setIsLoading(true);
    }

    fetchData();
  }, []);

  console.log(nftData);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={nftData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {nftData.title} #{nftData.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftData.likes}
                        </div>
                      </div>
                      <p>{nftData.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.ownerId}`}>
                                {nftData.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.creatorId}`}>
                                {nftData.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftData.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: "500px" }}
                    ></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "300px", height: "40px" }}
                      ></div>
                      <div className="item_info_counts">
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                      </div>
                      <div
                        className="skeleton-box"
                        style={{ width: "100%", height: "80px" }}
                      ></div>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={{ width: "125px", height: "20px" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={{ width: "125px", height: "20px" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <div
                            className="skeleton-box"
                            style={{ width: "75px", height: "20px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
