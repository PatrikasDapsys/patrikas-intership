import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Countdown from "./Countdown";

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
          <OwlCarousel {...owlCarouselOptions}>
            {newItemsData.length
              ? newItemsData.map((elem) => (
                  <div className="nft__item" key={elem.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${elem.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={elem.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={elem.expiryDate} />
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

                      <Link to={`/item-details/${elem.nftId}`}>
                        <img
                          src={elem.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
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
                ))
              : "loading..."}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};
//   return (
//     <section id="section-items" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2>New Items</h2>
// {newItemsData.length
//   ? (newItemsData.map((element) => {
//       <div
//         className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
//         key={element.id}
//       >
//         <div className="nft__item">
//           <div className="author_list_pp">
//             <Link
//               to="/author"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               title="Creator: Monica Lucas"
//             >
//               <img className="lazy" src={AuthorImage} alt="" />
//               <i className="fa fa-check"></i>
//             </Link>
//           </div>
//           <div className="de_countdown">5h 30m 32s</div>

//           <div className="nft__item_wrap">
//             <div className="nft__item_extra">
//               <div className="nft__item_buttons">
//                 <button>Buy Now</button>
//                 <div className="nft__item_share">
//                   <h4>Share</h4>
//                   <a href="" target="_blank" rel="noreferrer">
//                     <i className="fa fa-facebook fa-lg"></i>
//                   </a>
//                   <a href="" target="_blank" rel="noreferrer">
//                     <i className="fa fa-twitter fa-lg"></i>
//                   </a>
//                   <a href="">
//                     <i className="fa fa-envelope fa-lg"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <Link to="/item-details">
//               <img
//                 src={nftImage}
//                 className="lazy nft__item_preview"
//                 alt=""
//               />
//             </Link>
//           </div>
//           <div className="nft__item_info">
//             <Link to="/item-details">
//               <h4>Pinky Ocean</h4>
//             </Link>
//             <div className="nft__item_price">3.08 ETH</div>
//             <div className="nft__item_like">
//               <i className="fa fa-heart"></i>
//               <span>69</span>
//             </div>
//           </div>
//         </div>
//         //{" "}
//       </div>;
//     }))
//   : ("Loading...")}
//               <div className="small-border bg-color-2"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export default NewItems;

// {new Array(4).fill(0).map((_, index) => (
//   <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
//     <div className="nft__item">
//       <div className="author_list_pp">
//         <Link
//           to="/author"
//           data-bs-toggle="tooltip"
//           data-bs-placement="top"
//           title="Creator: Monica Lucas"
//         >
//           <img className="lazy" src={AuthorImage} alt="" />
//           <i className="fa fa-check"></i>
//         </Link>
//       </div>
//       <div className="de_countdown">5h 30m 32s</div>

//       <div className="nft__item_wrap">
//         <div className="nft__item_extra">
//           <div className="nft__item_buttons">
//             <button>Buy Now</button>
//             <div className="nft__item_share">
//               <h4>Share</h4>
//               <a href="" target="_blank" rel="noreferrer">
//                 <i className="fa fa-facebook fa-lg"></i>
//               </a>
//               <a href="" target="_blank" rel="noreferrer">
//                 <i className="fa fa-twitter fa-lg"></i>
//               </a>
//               <a href="">
//                 <i className="fa fa-envelope fa-lg"></i>
//               </a>
//             </div>
//           </div>
//         </div>

//         <Link to="/item-details">
//           <img
//             src={nftImage}
//             className="lazy nft__item_preview"
//             alt=""
//           />
//         </Link>
//       </div>
//       <div className="nft__item_info">
//         <Link to="/item-details">
//           <h4>Pinky Ocean</h4>
//         </Link>
//         <div className="nft__item_price">3.08 ETH</div>
//         <div className="nft__item_like">
//           <i className="fa fa-heart"></i>
//           <span>69</span>
//         </div>
//       </div>
//     </div>
//   </div>
// ))}
