import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./dist/css/bootstrap.css"
import "./dist/css/main.css"
import "./cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
import "./dist/css/libs/animate.css"
import "./dist/css/menu.css"
import "./fonts/icomoon/style.css"
import "./dist/css/menus/owl.carousel.min.css"
import "./dist/css/bootnavbar.css"
import "./dist/css/testimonial.css"
import "./cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
import "./cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css"
import "./cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.theme.min.css"




import portfolioSliderImg from "./images/investyoumoney.png"
import fmcg from "./images/fmcg.png"
import agriculture from "./images/agriculture.png"
import logistics from "./images/logistics.png"
import goldfinanc from "./images/goldfinanc.png"
import industrial from "./images/industrial.png"
import telecommunications from "./images/telecommunications.png"
import agricultureSliderImg from "./images/agriculture-slider-img.png"
import agriC1 from "./images/agri-c1.png"
import agriStream from "./images/agri-stream.png"
import agriVan from "./images/agriVan.png"

import Navbar from '../features/landingpage-navbar/Navbar'

const Portfolio = () => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData);
    useEffect(() => {
        // Check if user is logged in
        if (userData && userData.role === "Member") {
          // If user is logged in, redirect to dashboard
          navigate("/member/dashboard");
        } 
        if(userData && userData.role === "Admin"){
          navigate("/admin/receiptlist")
        }
      }, [userData, navigate]);

  return (
    <div>
      <Navbar/>
      <div className="section portfolioSection" style={{marginTop: '80px'}}>
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 control-text">
                <div className="portfolio_text wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <h1>Find Out Where
                    <br />
                    <span> We Invest Your Money!<br />
                    </span></h1>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={portfolioSliderImg} className="img-fluid" alt="Responsive Image" />
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>

      <div>
        <div className="section Investor_Borrower">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold">
                      <span>Who <span className="text-indigo-400">are we?</span></span>
                    </h2>
                  </div>
                  <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Invest Bachat is at the forefront of transforming businesses through purpose-driven financing solutions. Our investment portfolio extends across diverse industries, including the essential supply chains of Fast-Moving Consumer Goods (FMCG), Agriculture, and Logistics. Additionally, for institutional or individual borrowers outside of the supply chain ecosystem,&nbsp; Finja also provides finances against Gold. With a closed-loop and purpose-built financing model, Invest Bachat empowers businesses to attain unparalleled financial stability. Our commitment lies in strategically supporting these vital sectors, enabling them to thrive and contribute to the nation's economic growth. Through tailored investment strategies, we facilitate sustainable growth and foster a brighter future for businesses within these dynamic industries.
                  </p><div>
                    {/* <a href="https://app.finjainvest.com/" style={{textDecoration: 'none'}} className="primarybtn wow fadeInDown" data-wow-delay="1s" type="submit">
                      Invest Now
                    </a> */}
                  </div>
                  <p />
                  <p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className="section portfolio-blocks" style={{paddingTop: '0px'}}>
          <div className="container mgb-50">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={fmcg} className="img-fluid" alt="Responsive Image" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6  control-text">
                  <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    FMCG Distribution Network</h2>
                  <p className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Our closed-loop financing solutions are essential to the Fast Moving Consumer Goods (FMCG) supply chain business, which is Invest Bachat's primary emphasis. Our digital credit solutions give shops the ability to buy inventory, thereby fostering their expansion and operational agility. Furthermore, we provide distributors and wholesalers with invoice discounting options that are specifically designed to help them maximize cash flow through stock acquisitions.

                  </p>
                  {/* <a href="fmcg.html" className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Read more
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="container mgb-50">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 order-control  control-text">
                  <h2 className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Supply Chain for Agriculture</h2>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Finja's constant dedication to improving the Supply Chain for Agriculture is demonstrated by the crucial help it provides to manufacturers and distributors. Our creative strategy is offering complete invoice discounting options made especially for distributors and wholesalers. These essential participants in the agricultural ecosystem are guaranteed easy and quick access to funding thanks to this targeted financial support. The purpose of these funding is to ensure that vital agricultural supplies are secured so that agricultural activities can continue unhindered.
                  </p>
                  {/* <a href="agriculture.html" className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Read more
                  </a> */}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={agriculture} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
          </div>
          <div className="container mgb-50">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={logistics} className="img-fluid" alt="Responsive Image" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6  control-text">
                  <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Logistics Supply Chain</h2>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Logistics Supply Chain Finja provides transportation firms and logistics service providers with vital support, demonstrating its constant focus to strengthening the logistics supply chain. Our forward-thinking approach comprises providing complete invoice finance solutions designed specifically for the transportation industry. This tactical financial support ensures that these vital logistics network players have easy and quick access to funding.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mgb-50">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6  control-text order-control">
                  <h2 className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Gold-Backed Financing</h2>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    In addition to supply chain ecosystems, Finja and Goldfin collaborate to provide institutional and individual borrowers with financial support via a special channel: finance secured by gold. With the help of this cutting-edge product, borrowers can leverage their gold assets to get the money they need to expand their businesses. Investors can diversify their investment approach by taking part in this portfolio, which is an additional alternative. In addition to using the borrowed funds to grow their businesses, borrowers also fulfill their financial obligations by giving back the capital and any profits to investors. Borrowers reclaim ownership of their gold after the obligation is fulfilled, capping off a smooth and advantageous transaction.
                  </p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={goldfinanc} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
          </div>
          <div className="container mgb-50">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 control-image   wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={industrial} className="img-fluid" alt="Responsive Image" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6  control-text">
                  <h2 className="wow fadeInDown" style={{marginTop: '0px', animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Industrial Engineering Supply Chain</h2>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Finja's unwavering commitment to fortifying the industrial engineering supply chain is demonstrated by the priceless assistance it provides to suppliers and manufacturers. Our creative strategy includes offering complete invoice discounting options designed especially for manufacturers and distributors of industrial engineering supplies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mgb-50">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6  control-text order-control">
                  <h2 className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Telecommunications Franchises &amp; Retail
                    Financing</h2>
                  <p className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Finja intends to increase the size of its investment portfolio in the telecoms sector by working with a few significant players in the sector to provide customized financial solutions for the companies operating in that market.
                  </p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={telecommunications} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="section FMCGSection" style={{marginTop: '80px'}}>
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 control-text">
                <div className="portfolio_text wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <h1 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span>Empowering</span><br />
                    Agriculture with<br />
                    Invest Bachat
                  </h1>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Invest Bachat's recent investment portfolio includes
                    Supply Chain for Agriculture Financing, where we are
                    making a significant impact.</p>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={agricultureSliderImg} className="img-fluid" alt="Responsive Image" />
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>


<div>
        <div className="section Investor_Borrower">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row  text-center">
                  <div className="col-lg-12 sectionHeading wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <h2 className="text-4xl font-bold mb-6">
                      <span>Why does  <span className="text-indigo-400">Supply Chain for Agriculture Financing Matter?</span></span>
                    </h2>
                  </div>
                  <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">The foundation of our economy is the agriculture sector. Farmers and agribusinesses require access to timely funding in order to survive and meet the increasing demand. Invest Bachat is available to assist this essential industry.
                  </p><div>
                  </div>
                  <p />
                  <p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section aboutSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6  control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={agriC1} className="img-fluid" alt="Responsive Image" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 about-text control-text">
                  <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span className="textEffect" />
                    Tailored <strong>&amp; Credit Solutions for
                      Farmers</strong></h2>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    We design our digital financing solutions with farmers and agribusinesses in mind. We give them the money they need to buy fertilizer, seeds, and other necessities so they may increase their production and standard of living.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className=" aboutSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 about-text control-text">
                  <h2 className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s"> 
                    <span className="textEffect" />
                    Streamlined <strong>  Funding for Agribusinesses</strong></h2>
                  <p className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    We offer efficient Invoice financing solutions for agribusinesses involved in processing and distribution. Our support helps them maintain a steady supply chain, reduce production bottlenecks, and expand their operations.
                  </p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6  control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={agriStream} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className="section " style={{background: '#FBFBFB'}}>
          <div className="container">
            <div className="container-fluid ">
              <div className="row ">
                <div className="row mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold">
                      <span>Our partners in <span className="text-indigo-400">Supply Chain for Agriculture Financing Matter?</span></span>
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s', margin: 'auto'}} data-wow-delay="0.05s">
                  <img src={agriVan} className="img-fluid" />
                  </div>
                  <div className="col-sm-8">
                    <p>
                      VAN acts as a hub of knowledge of agriculture best practices and services. VAN facilitates access to quality inputs, access to credit, access to extension services, soil analytical services, crop-specific nutrition planning access to agri-machinery on rental, formal training, and market access. We provide our services through the establishment of an agri center (Vital Agri Centers) referred to as COBO to act as a one-window solution for farmers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section FCSGpartnership agriProvenbox">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold">
                      <span>Proven  <span className="text-indigo-400">Success and Track Record</span></span>
                    </h2>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="partnershipBox">
                    <div className="partnershipBoxinner">
                      <p>Onboarded
                        Farmers<br /></p>
                      <h1>8524</h1>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="partnershipBox">
                    <div className="partnershipBoxinner">
                      <p>Area<br />
                      </p>
                      <h1>70,000</h1>
                      <p>acres</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="partnershipBox">
                    <div className="partnershipBoxinner">
                      <p>Average increase<br />
                        in yield (per acre)</p>
                      <h1>15%</h1>
                    </div>
                  </div>
                </div>
                {/*<div class="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style="animation-play-state: running; animation-duration: 0.05s; animation-delay: 0.05s;" data-wow-delay="0.05s">
                <div class="partnershipBox">
                    <div class="partnershipBoxinner">
                  <p>Access to<br>
                    Finance (Farmers)</p>
                      <h1>62</h1>
                  </div>
                </div>
            </div>!*/}
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="partnershipBox">
                    <div className="partnershipBoxinner">
                      <p>Increased Profitability<br />
                        (For Farmers)</p>
                      <h1>560M</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Portfolio
