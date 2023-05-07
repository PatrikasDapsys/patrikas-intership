import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorID } = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [isFollowButtonClicked, setIsFollowButtonClicked] = useState(false);
  const [followButtonText, setFollowButtonText] = useState("Follow");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(false);
      const { data } = await axios.get(`
      https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorID}
      `);
      setAuthorData(data);
      setLoading(true);
    }

    fetchData();
  }, []);

  function clickedFollowButton() {
    setIsFollowButtonClicked(!isFollowButtonClicked);
    if (!isFollowButtonClicked) {
      authorData.followers += 1;
      setFollowButtonText("Unfollow");
    } else {
      authorData.followers -= 1;
      setFollowButtonText("Follow");
    }
  }


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {Loading ? (
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              @{authorData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    ) : (
                      <div className="profile_avatar">
                        <div className="profile_avatar--skeleton skeleton-box"></div>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              className="skeleton-box"
                              style={{
                                width: "200px",
                                height: "24px",
                                marginBottom: "8px",
                              }}
                            ></span>
                            <span
                              className="skeleton-box"
                              style={{
                                width: "100px",
                                height: "16px",
                                marginBottom: "8px",
                              }}
                            ></span>
                            <span
                              className="skeleton-box"
                              style={{ width: "100px", height: "16px" }}
                            ></span>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>
                  {Loading ? (
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {authorData.followers} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={clickedFollowButton}
                        >
                          {followButtonText}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <span
                          className="skeleton-box"
                          style={{ width: "150px", height: "40px" }}
                        ></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
