import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      AOS.init({ once: true });
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellersData(data);
    }

    fetchData();
  }, []);

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
          <div
            className="col-md-12"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="150"
          >
            <ol className="author_list">
              {topSellersData.length
                ? topSellersData.map((elem) => (
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
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <span className="author_list_wrap">
                        <div
                          className="skeleton-box author_list_pp--skeleton author_list_pp"
                          style={{ margin: "0px 10px 0px 0px" }}
                        >
                          <i className="fa fa-check"></i>
                        </div>
                        <span>
                          <div className="author_list_info--skeleton skeleton-box author_list_info"></div>
                          <div
                            className="skeleton-box"
                            style={{
                              width: "40px",
                              height: "20px",
                              margin: "10px 0px 0px 0px",
                            }}
                          ></div>
                        </span>
                      </span>
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
