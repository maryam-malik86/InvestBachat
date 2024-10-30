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



import handImg from "./images/hand.png";
import higher from "./images/higher.png"
import closed1 from "./images/closed1.png"
import sliderImg from "./images/sliderImg.png"
import logo from "./images/logo.png"
import productImg from "./images/productImg.png"
import checkboxImg from "./images/checkbox.png"
import productImg2 from "./images/productImg2.png"
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
import productSlider from "./images/productSlider.png" 
import p2p from "./images/p2p.png"
import Group26849 from "./images/Group26849.png"
import Group26850 from "./images/Group26850.png"
import step1 from "./images/step1.png"
import step2 from "./images/step2.png"
import step3 from "./images/step3.png"
import step4 from "./images/step4.png"
import step5 from "./images/step5.png"
import step6 from "./images/step6.png"
import w1 from "./images/w1.png"
import w2 from "./images/w2.png"
import w3 from "./images/w3.png"
import w4 from "./images/w4.png"
import w5 from "./images/w5.png"
import w6 from "./images/w6.png"
import portfolioSliderImg from "./images/portfolioSliderImg.png"
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
import digital from "./images/digital.png"
import Illustration from "./images/Illustration.svg"
import invoiceDiscounting from "./images/invoiceDiscounting.png"
import vizpro from "./images/vizpro.png"
import DigitalPayment from "./images/DigitalPayment.png"
import riskMitigation from "./images/riskMitigation.png"
import digitalCredit from "./images/digitalCredit.png"
import financialInclusion from "./images/financialInclusion.png"
import operationalStreaming from "./images/operationalStreaming.png"
import leftbusiness from "./images/leftbusiness.png"
import rightbusiness from "./images/rightbusiness.png"
import pepsi from "./images/logos/pepsi.png"
import uni from "./images/logos/uni.png"
import nest from "./images/logos/nest.png"
import coca from "./images/logos/coca.png"
import metro from "./images/logos/metro.png"
import dastger from "./images/logos/dastger.png"
import licenseSlider from "./images/licenseSlider.png"
import journey from "./images/journey.png"
import qasif from "./images/qasif.png"
import tp1 from "./images/tp1.png"
import investorimage from "./images/investorimage.png"
import revolution from "./images/revolution.png"
import v1 from "./images/v1.png"
import v2 from "./images/v2.png"
import v3 from "./images/v3.png"
import Navbar from '../features/landingpage-navbar/Navbar'


const OurStory = () => {

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
       <div>
        <div className="section Investor_Borrower mt-16">
          <div className="container">
            <div className="container-fluid">
              <div className>
                <div className="row  text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold mb-6">
                      <span>Who   <span className="text-indigo-400">are We?</span></span>
                    </h2>
                  </div>
                  <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Invest Bachat is Pakistan's pioneering and sole peer-to-peer financing platform licensed and regulated by the Securities and Exchange Commission of Pakistan(SECP). At Invest Bachat, we are committed to transforming the financial landscape while adhering to the Shariah principles. Our platform empowers both borrowers and investors, providing them with seamless access to capital and higher returns on investments, respectively. As a platform we work on Shariah principles and we prioritize ethical financial solutions, offering a secure and transparent environment that aligns with Islamic principles.
                    &nbsp;              </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" Investor_Borrower">
            <div className="container">
              <div className="container-fluid">
                <div className>
                  <div className="row  text-center mgb-50">
                    <div className="col-lg-12 sectionHeading">
                    <h2 className="text-4xl font-bold mb-6">
                      <span>Who   <span className="text-indigo-400">are Invest bachat?</span></span>
                    </h2>
                    </div>
                    <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Founded in 2016 by Qasif Shahid and Monis Rehman, Finja is Pakistan’s only digital financial services platform with dual licenses serving Micro, Small, and Medium Enterprises through digital credit, payments, and collection solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div className=" ourTeamSection">
            <div className="container">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <div className="teamSectionBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <div className="team_image">
                        <img src={qasif} style={{marginLeft: '-50px'}} alt="" />
                      </div>
                      <div className="team_person_name1">
                        <h2>Qasif Shahid</h2>
                        <p>CEO &amp; Co-Founder </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <div className="teamSectionBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <div className="team_image">
                        <img src={tp1} style={{marginLeft: '-50px'}} alt="" />
                      </div>
                      <div className="team_person_name2">
                        <h2>Monis Rehman</h2>
                        <p>Chairman &amp; Co-Founder </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
        <div className="section Investor_Borrower" id="whatwedo">
          <div className="container">
            <div className="container-fluid">
              <div className>
                <div className="row  text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold mb-6">
                      <span>What  <span className="text-indigo-400">we do?</span></span>
                    </h2>
                  </div>
                  <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Finja leverages its proprietary AI/ML data analytics along with its cutting-edge technology and efficient partnerships with suppliers, distributors, and small Businesses in supply chains of multiple industries like FMCG, Agriculture and Logistics,&nbsp; to curate purpose-built close-looped credit financing products for Micro, Small, and Medium Enterprises helping them grow their businesses and contribute to
                    the country's GDP.
                  </p>
                  <div className="control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <img src={investorimage} className style={{width: '100%'}} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className="section aboutSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 about-text control-text order-control">
                  <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <span className="textEffect" />
                    Revolutionising <strong>financing
                      in Pakistan</strong></h2>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    At Finja, our journey has been driven by a passion to uplift the underserved segments of our country. We embarked on this path with a vision to provide real-time digital credit and payment solutions to those often overlooked by traditional financial services. Through our dedicated efforts, we discovered the immense potential of retailers in the FMCG supply chain segment, recognizing them as promising yet neglected businesses. This realization led to the inception of Invest Bachat, a platform designed to empower small businesses and individuals to invest smartly and achieve higher returns.
                  </p>
                  <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    Building on our success in the FMCG sector, we expanded our horizons into other vital industries such as Agriculture and Logistics, fueling growth and transformation. At Finja, we are committed to bridging the gap between SMEs and corporations, reshaping the economic landscape for a more inclusive and prosperous future.
                  </p>
                  {/* <a href="https://app.finjainvest.com/" style={{textDecoration: 'none'}} className="primarybtn wow fadeInDown" data-wow-delay="1s" type="submit">
                    Start Investing Today!
                  </a> */}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={revolution} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className="section valuesSection">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row  text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold mb-6">
                      <span>Our  <span className="text-indigo-400">Values</span></span>
                    </h2>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-4">
                  <div className="valuesSectionBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="value_image">
                      <img src={v1} alt="" />
                    </div>
                    <h2 cla>The Dream Team</h2>
                    <p>
                      We hire some of the most experienced professionals in Pakistan to provide the best outcome for you. Our team now offers a secure and reliable platform for easy and accessible investment opportunities.      
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-4">
                  <div className="valuesSectionBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="value_image">
                      <img src={v2} alt="" />
                    </div>
                    <h2>Integrity</h2>
                    <p>
                      One of our aims, is to indulge in actions which promotes adequate transparency among our partners. Furthermore, we also only team up with those SMEs which, have the brightest of futures.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-4">
                  <div className="valuesSectionBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="value_image">
                      <img src={v3} alt="" />
                    </div>
                    <h2>Democratising Investing</h2>
                    <p>
                      We want to challenge traditional investing, and connect borrowers to investors. Their common interest gives us the motivation to work harder and make a difference. A small step today is a big change for tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OurStory
