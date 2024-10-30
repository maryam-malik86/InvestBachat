import React, { useEffect } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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



import handImg from "./images/hand.png";
import higher from "./images/higher.png"
import closed1 from "./images/closed1.png"
import sliderImg from "./images/investment.jpg"
import logo from "./images/logo.png"
import productImg from "./images/ourProduct-removebg-preview.png"
import checkboxImg from "./images/checkbox.png"
import productImg2 from "./images/product2-removebg-preview.png"
import goods from "./images/goods.png"
import agri from "./images/agri.png"
import logistic from "./images/logistic.png"
import consumer from "./images/consumer.png"
import telco from "./images/telco.png"
import eng from "./images/eng.png"
import safe from "./images/safe.png"
import earn from "./images/earn.png"
import handpicked from "./images/handpicked.png"
import diversified from "./images/diversified.png"
import transparency from "./images/transparency.png"
import stock from "./images/stock.png"
import invoice from "./images/invoice.png"
import premature from "./images/premature.png"
import shariah from "./images/shariah.png"
import image36 from "./images/logos/image36.png"
import image37 from "./images/logos/image37.png"
import image38 from "./images/logos/image38.png"
import image39 from "./images/logos/image39.png"
import image40 from "./images/logos/image40.png"
import image41 from "./images/logos/image41.png"
import alongsideImg from "./images/alongsideImg.png"
import image42 from "./images/logos/image42.png"
import image43 from "./images/logos/image43.png"
import image44 from "./images/logos/image44.png"
import image45 from "./images/logos/image45.png"
import image46 from "./images/logos/image46.png"
import realLogo from "./images/realLogo.png"

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../features/landingpage-navbar/Navbar";



const LandingPage = () => {


  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  console.log(userData)
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




  const testimonialData = [
    {
        id: 1,
        content: "Peer-to-peer lending has become a notable and attractive asset class. I've been able to benefit from invest bachat favorable returns and portfolio diversification by investing with it. I'm glad my money is supporting regional SMEs in Pakistan, which helps the country's business community expand. In addition, I'm really satisfied with their outstanding customer service."
    },
    {
        id: 2,
        content: "With the launch of a ground-breaking platform, Invest Bachat is transforming personal investing in Pakistan. This platform presents a novel and innovative approach to investing for individuals. With Invest bachat, you can help local small and medium-sized businesses (SMEs) grow and succeed by directly investing your money in these companies and reaping extraordinary profits."
    },
    {
        id: 3,
        content: "Peer-to-peer lending is a great concept. In contrast to more conventional investment routes, Invest Bachat has allowed me to obtain attractive returns. I have total control over my investments, which enables me to put together a diversified portfolio that includes a range of risk profiles and investment kinds. It also gives me satisfaction to know that my investments help Pakistani local small businesses flourish."
    },
    {
        id: 4,
        content: "I've been investing my savings with Invest Bachat for the past two years, and I'm happy I did. It's an easy approach to make investments. It's really practical, especially for someone like myself who didn't want to invest by going through a challenging process or doing a lot of research. I urge everyone I know to make investments here, particularly women, who, regrettably, have few to no decent options for doing so in this nation."
    },
    {
        id: 5,
        content: "Peer-to-peer finance has previously proven successful in developed countries, therefore this is a win-win situation for all parties. I don't have to deal with many major barriers to entry in order to choose the companies I want to invest in. Investing in bachat yields more enticing profits and fosters a sense of community involvement in the expansion of nearby companies. I am completely confident to join in investing through this platform because of the Invest bachat team's comprehensive due diligence."
    }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000, // Adjust autoplay speed as needed
  pauseOnHover: true
};

const customArrowStyle = `
.slick-prev:before, .slick-next:before {
    color: black;
}
`;


  return (
    <div>




    <Navbar/>








      <div className="section sliderSection" id="index" style={{marginTop: '80px'}}>
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 mt-16 col-lg-6">
                <div className="textSection" style={{marginTop: '-35px'}}>
                  <div>Earn up to</div>
                  <div>36%</div>
                  <div>annual returns</div>
                  <p>by Making an Investment in Pakistani Business Financing</p>
                  <Link to={"/auth/signup"} style={{textDecoration: 'none'}} className="btn primarybtn"> 
                  Start Investing Now
                  </Link>
                </div>
                <div className="iconsWrappe hide-mobile">
                  <div className="sliderIconbox">
                    <div className="sliderIconboximg"><img src={handImg} /></div>
                    <p className="sliderIconboxText">
                      Diversified<br />
                      Investments
                    </p>
                  </div>
                  <div className="sliderIconbox">
                    <div className="sliderIconboximg2"><img src={higher} /></div>
                    <p className="sliderIconboxText">Higher Returns</p>
                  </div>
                  <div className="sliderIconbox right-control">
                    <div className="sliderIconboximg3"><img src={closed1} /></div>
                    <p className="sliderIconboxText">
                      Closed-Loop<br />
                      Financing
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 margin-mobile-top20">
                <img src={sliderImg} className="img-fluid" alt="Responsive Image" />
              </div>
              <div>
                <button style={{margin: '20px auto auto auto'}} className="btn primarybtn show-mobile" type="submit">
                  Start Investing Now
                </button>
              </div>
              <div className="iconsWrappe show-mobile d-flex-768">
                <div className="sliderIconbox">
                  <div className="sliderIconboximg"><img src={handImg} /></div>
                  <p className="sliderIconboxText">
                    Diversified<br />
                    Investments
                  </p>
                </div>
                <div className="sliderIconbox">
                  <div className="sliderIconboximg2"><img src={higher} /></div>
                  <p className="sliderIconboxText">Higher Returns</p>
                </div>
                <div className="sliderIconbox right-control">
                  <div className="sliderIconboximg3"><img src={closed1} /></div>
                  <p className="sliderIconboxText">
                    Closed-Loop<br />
                    Financing
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>




      <div className="section aboutSection">
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 about-text control-text">
                <h2 data-wow-delay=".10s" className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '1s', animationDelay: '0.10s'}}>
                  <span className="textEffect" />
                  About <strong >Invest Bachat</strong>
                </h2>
                <p data-wow-delay=".50s" className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '1s', animationDelay: '0.10s'}}>
                We are the first and only peer-to-peer lending platform in Pakistan with Securities and Exchange Commission licensing and regulation. Our goal is to improve the local business community by providing institutional and individual investors with convenient investment options and bridging financial gaps for MSMEs in various industries and the FMCG supply chain. We have the potential to completely transform Pakistan's investment landscape by offering a transparent and safe platform for long-term development and financial inclusion, all thanks to our in-house developed AI/ML engines.

             
                </p>  
              </div>
              <div
  className="col-sm-12 col-md-12 col-lg-6 video-box about-video control-image wow fadeInDown"
  style={{
    animationDelay: '0.25s',
    animationDuration: '1s',
    animationPlayState: 'running'
  }}
>
  <iframe
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    frameBorder="0"
    height="315"
    src="https://www.youtube.com/embed/JVwfd4ka42o"
    style={{
      borderRadius: '15px'
    }}
    title="YouTube video player"
    width="100%"
  />
</div>
            </div>
          </div>
        </div>
        <div>
        </div>

      </div>
      <div className="section productSection" id="products"  >
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="row mgb-50">
                <div className="col-lg-12 sectionHeading">
                <h2 className="text-4xl font-bold">
                      <span>Our <span className="text-indigo-400">Products</span></span>
                    </h2>
                </div>
              </div>
              <div className="  col-sm-12 col-md-12 col-lg-7 productImg control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '1s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={productImg} className="img-fluid" alt="Responsive Image" />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-5 productListing product-text-control control-text">
                <h3 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">RapidGrow</h3>
                <ul>
                  <li className=" flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span><img src={checkboxImg} /></span> Up to 36% Annual Returns
                  </li>
                  <li className=" flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span><img src={checkboxImg} /></span> Minimum Risk
                  </li>
                  <div className="clearfix" />
                  <li className=" flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span><img src={checkboxImg} /></span> monthly updates of returns
                  </li>
                  <li className=" flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span><img src={checkboxImg} /></span> Short term Investments
                  </li>
                </ul>
                {/* <a href="product.html#rapidGrow" style={{textDecoration: 'none', animationPlayState: 'paused', visibility: 'visible', animationDelay: '0s', animationDuration: '1s', animationName: 'fadeInDown'}} className="primarybtn wow fadeInDown  animated" data-wow-delay="0.3s" type="submit">
                  Read more
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>  
        <div className="section productSection" id="secureGrow">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5 productListing product-text-control order-control ">
                  <h3 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">SecureGrow</h3>
                  <ul>
                    <li className=" flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <span><img src={checkboxImg} /></span> Up to 26% Annual Returns
                    </li>
                    <li className="flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <span><img src={checkboxImg} /></span> Capital Protection
                    </li>
                    <div className="clearfix" />
                    <li className="flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.5s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <span><img src={checkboxImg} /></span> No Risk
                    </li>
                    <li className="flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <span><img src={checkboxImg} /></span> Fixed Term Investments
                    </li>
                    <li className="flex gap-2 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <span><img src={checkboxImg} /></span> Option to Select Payouts
                    </li>
                  </ul>
                  {/* <a href="product.html#secureGrow" style={{textDecoration: 'none', animationPlayState: 'running', visibility: 'visible', animationDelay: '0s', animationDuration: '1s', animationName: 'fadeInDown'}} className="primarybtn wow fadeInDown  animated" data-wow-delay="0.4s" type="submit">
                    Read more
                  </a> */}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 productImg text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={productImg2} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className="section portfolioSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row mgb-50">
                  <div className="col-lg-12 sectionHeading">
                    <h2 className="text-4xl font-bold">
                      <span>Portfolios <span className="text-indigo-400">we Invest in!</span></span>
                    </h2>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="portfolioBox">
                    <div className="boxInner">
                      <img src={goods} className alt="Responsive Image" />
                      <p>Fast Moving Consumer
                        <br />Goods (FMCG)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="portfolioBox">
                    <div className="boxInner">
                      <img src={agri} className alt="Responsive Image" />
                      <p>Agriculture</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="portfolioBox">
                    <div className="boxInner">
                      <img src={logistic} className alt="Responsive Image" />
                      <p>Logistics</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="portfolioBox">
                    <div className="boxInner">
                      <img src={consumer} className alt="Responsive Image" />
                      <p>Gold-backed Consumer &amp;
                        Business Financing</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="portfolioBox">
                    <div className="boxInner">
                      <img src={telco} className alt="Responsive Image" />
                      <p>Telco Franchises &amp; Retailer
                        Financing</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="portfolioBox">
                    <div className="boxInner">
                      <img src={eng} className alt="Responsive Image" />
                      <p>Industrial Engineering</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="section investSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row ">
                <div className="row mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold">
                      <span>Why Make <span className="text-indigo-400">an Investment with?</span></span>
                    </h2>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={safe} className alt="Responsive Image" />
                    </div>
                    <h4>Secure Investments</h4>
                    <p>We have developed and promoted financial services to the underserved areas of the country since 2016. As a licensed NBFC and P2P financing platform, Finja has developed a sustainable financing book with a low default rate and has been offering purpose-built, closed-loop financing options to the supply chains of various industries, such as FMCG, logistics, and agriculture.
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={earn} className alt="Responsive Image" />
                    </div>
                    <h4>Achieve Greater Returns</h4>
                    <p>Comparing Invest Bachat to other conventional investing options in Pakistan, you may be able to increase your profits.</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={handpicked} className alt="Responsive Image" />
                    </div>
                    <h4>personally selected debtors</h4>
                    <p>Our innovative artificial intelligence (AI) and machine learning (ML) algorithms, which take into account over 100 data points, are the foundation of our data tracking and risk assessment. With them, you can access our prime customers who have a solid payback history.</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={diversified} className alt="Responsive Image" />
                    </div>
                    <h4>Investing with Diversity</h4>
                    <p>With only one click, you can divide your money into several investments. Simply add the desired amount to your account, and Invest Bachat will distribute the funds among several borrowers in various industry supply chains.
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.20s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={transparency} className alt="Responsive Image" />
                    </div>
                    <h4>Openness to the Core</h4>
                    <p>To ensure that you are constantly informed of your finances, we have tried to make our process as simple and clear as we can.</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.20s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={stock} className alt="Responsive Image" />
                    </div>
                    <h4>Finance for Stocks</h4>
                    <p>The amount you invest is never credited to the borrower directly; rather, it is deducted from the stock the borrower buys.
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.20s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={invoice} className alt="Responsive Image" />
                    </div>
                    <h4>Discounting of Invoices</h4>
                    <p>We have developed and promoted financial services to underserved segments of the country since 2016. In collaboration with top FMCG companies, Finja has been offering MSMEs (Karyana Stores) short-term finance as a regulated NBFC. As a result, the company has built a sustainable financing book with a low default rate.</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.20s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={premature} className alt="Responsive Image" />
                    </div>
                    <h4>Premature Encashment</h4>
                    <p>Investors who opt for Premature Encashment Invest Bachat can sell their investments at any time with a minimal discount.</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.20s'}} data-wow-delay="0.05s">
                  <div className="investBox">
                    <div className="investBoxImg">
                      <img src={shariah} className alt="Responsive Image" />
                    </div>
                    <h4>Islamic Funding</h4>
                    <p>Our dedication to providing profitable and moral financing at Invest Bachat is firmly based in Islamic values.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
                        



        <div>
       
        <div className="clearfix" />
        <div className="section supportedSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                   
                  </div>
                  <p className=" peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Since our founding, we have provided support to thousands of neighborhood businesses.
                    </p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="supportedBox1">
                    <div className="supportedBoxinner1">
                      <p>Invested in Local<br />
                        Businesses</p>
                      <h1>10B+</h1>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="supportedBox2">
                    <div className="supportedBoxinner2">
                      <p>Bad Debt<br />
                      </p>
                      <h1>0-1%</h1>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="supportedBox3">
                    <div className="supportedBoxinner3">
                      <p>Businesses We Have<br />
                        Supported</p>
                      <h1>27k+ </h1>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 text-center wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="supportedBox4">
                    <div className="supportedBoxinner4">
                      <p>Cities</p>
                      <h1>35+</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
          {/* <img src="images/leftbusiness.png" class="left-shadow" style="position: absolute; top:-100px; left: 0;" >
    <img src="images/rightbusiness.png" class="right-shadow" style="position: absolute; right: 0; bottom: 0px;" > */}
        </div>
    </div>


    <div className="section testimonialSection">
    <style>{customArrowStyle}</style>
        <div className="container">
          <div className="container-fluid p-relitive">
            <div className="row">
              <div className="row mgb-50">
                <div className="col-lg-12 sectionHeading">
                <h2 className="text-4xl font-bold">
                      <span>Customers <span className="text-indigo-400">Experience in focus!</span></span>
                    </h2>
                </div>
              </div>
              <div className="col-lg-8 control-testimonial">
                            <Slider {...settings}>
                                {testimonialData.map(testimonial => (
                                    <div key={testimonial.id} className="testimonial">
                                        <p className="description">{testimonial.content}</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
            </div>
          </div>
        </div>
      </div>






      <div className="section logoSections">
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="row mgb-50 text-center">
                <div className="col-lg-12 sectionHeading mgb-50">
                <h2 className="text-4xl font-bold mb-5">
                      <span>Supported by <span className="text-indigo-400">some of the top</span></span>
                    </h2>
                </div>
                <p className=" peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Finja has drawn in some of the greatest and most knowledgeable investors, such as Gray MacKenzie Engineering Services, a Descon firm, ICU Ventures, BeeNext, Vostok Emerging Finance, Quona Capital, and HBL. Recently, the company closed a $10 million series for its platform financing.</p>
              </div>
              <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={image36} className="img-fluid" />
              </div>
              <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={image37} className="img-fluid" />
              </div>
              <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={image38} className="img-fluid" />
              </div>
              <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={image39} className="img-fluid" />
              </div>
              <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={image40} className="img-fluid" />
              </div>
              <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.20s'}} data-wow-delay="1.1s">
                <img src={image41} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="section investAlongsideSection">
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 section-heading control-text order-control">
                <h2 className="mgb-20 wow fadeInDown hide-mobile" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="1.1s">Open <strong>the Door to Financial Independence</strong></h2>
                <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s" >  
                  In a world full of chances, this is where your financial success path starts. You are not only safeguarding your financial future but also fostering genuine businesses and assisting in their growth and success by making prudent investments now. Grab the opportunity to make a real difference in the growth of the companies you support and earn substantial returns with our professional advice and state-of-the-art investing tools.
                  <b>Rizwan Akram</b>
                </p>
              </div>
              <div className=" col-sm-12 col-md-12 col-lg-6 section-heading investImg control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <div>
                  <h2 className="mgb-20 wow fadeInDown show-mobile" style={{textAlign: 'left', animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Unlock
                    <strong>the Door to Financial Freedom</strong>
                  </h2>
                </div>
                <img src={alongsideImg} className="img-fluid" alt="Responsive Image" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="1.1s" />
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div> */}


      <div className="section logoSections">
        <div className="container">
          <div className="container-fluid ">
            <div className="row text-center">
              <div className="row mgb-50">
                <div className="col-lg-12 sectionHeading">
                <h2 className="text-4xl font-bold">
                      <span>We have <span className="text-indigo-400">Been in The News!</span></span>
                    </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <a href="#">
                    <img src={image42} className="img-fluid" />
                  </a>
                </div>
                <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <a href="#">
                    <img src={image43}  className="img-fluid" />
                  </a>
                </div>
                <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <a href="#">
                    <img src={image44}  className="img-fluid" />
                  </a>
                </div>
                <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <a href="#">
                    <img src={image45}  className="img-fluid" />
                  </a>
                </div>
                <div className="col-sm-2 text-center sec_logos wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <a href="#">
                    <img src={image46}  className="img-fluid" />
                  </a>
                </div>
                <div className="col-sm-1" />
              </div>
              <strong className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s', paddingTop: '20px', display: 'inline-block'}} data-wow-delay="0.05s">For Better Returns, Choose Invest Bachat</strong>
              {/* <div className="text-center">
                <a href="ourstory.html" style={{textDecoration: 'none', animationPlayState: 'running', visibility: 'visible', animationDelay: '1.8s', animationDuration: '1s'}} className="primarybtn mgt-20 wow fadeInDown  animated" data-wow-delay="1.8s" type="submit">
                  Read More
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>



{/* ----------- footer ------------------------ */}



<div
  className="section footerSection wow fadeInDown"
  data-wow-delay="0.05s"
  style={{
    animationDelay: '0.05s',
    animationDuration: '0.05s',
    animationPlayState: 'running',
    paddingBottom: '30px'
  }}
>
  <div className="container">
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-sm-3">
          <img
            src={realLogo}
            width={'150px'}
          />
          <div className="social-icons">
            <h2>
              Follow Us:
            </h2>
            <a
              href="https://www.instagram.com/investbachat.com"
              target="_blank"
            >
              <div className="instagram" />
            </a>
            <a
              href="https://www.facebook.com/investbachat.com"
              target="_blank"
            >
              <div className="facebook" />
            </a>
            <a
              href="https://x.com/Investbachat.com"
              target="_blank"
            >
              <div className="twitter" />
            </a>
            <a
              href="https://youtube.com/@deployosoft"
              target="_blank"
            >
              <div className="youtube" />
            </a>
            {/* <a
              href="https://www.tiktok.com/@finjainvest"
              target="_blank"
            >
              <div className="tiktok" />
            </a> */}
            {/* <a
              href="https://www.linkedin.com/company/finja"
              target="_blank"
            >
              <div className="linkdin" />
            </a> */}
            <a href="https://wa.me/+447957542272/">
              <div className="whatsapp" />
            </a>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="row">
            <div className="col-sm-3 footerNav">
              <strong>
              </strong>
              <ul>
                <li>
                  <a >
                    Home
                  </a>
                </li>
                <li>
                  <a>
                    Portfolio
                  </a>
                </li>
                <li>
                  <a >
                    Our Story
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 footerNav">
              <strong>
              </strong>
              <ul>
                <li>
                  <a >
                    Security
                  </a>
                </li>
                <li>
                  <a href="license.html">
                    License
                  </a>
                </li>
                <li>
                  <a >
                    Shariah
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 footerNav">
              <strong>
                Products
              </strong>
              <ul>
                <li>
                  <a>
                    RapidGrow
                  </a>
                </li>
                <li>
                  <a >
                    SecureGrow
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 footerNav">
              <strong>
                Resources
              </strong>
              <ul>
                <li>
                  <a >
                    FAQs
                  </a>
                </li>
                <li>
                  <a>
                    T&Cs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footerBottom">
    © 2023-2024 Invest bachat Lending Services. All Rights Reserved.
  </div>
</div>




    </div>
  );
};

export default LandingPage;
