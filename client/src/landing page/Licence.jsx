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

const Licence = () => {

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
        <div className="section license_Slider_Section" style={{marginTop: '80px'}}>
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 control-text">
                  <div className="licenseSlider_text control-text">
                    <h1 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Pakistan’s First <br /><span>P2P Financing
                        platform licensed
                      </span></h1>
                    <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">From idea to impact, discover the roots, passion, and vision that fuels Invest Bachat's commitment to financial innovation and empowerment.</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <img src={licenseSlider} className="img-fluid" alt="Responsive Image" />
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="section Investor_Borrower">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row  text-center mgb-50">
                  <div className="col-lg-12 sectionHeading">
                  <h2 className="text-4xl font-bold mb-6">
                      <span>Pakistan's first  <span className="text-indigo-400">Pakistan’s first licensed and regulated
Peer-to-peer Financing Platform</span></span>
                    </h2>
                  </div>
                  <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">In the ever-evolving landscape of financial services, licenses and regulations stand as the bedrock of trust, security, and ethical practice. At Invest Bachat, Pakistan's pioneering peer-to-peer financing platform, we recognize the paramount significance of adhering to licenses and regulations. These essential safeguards not only validate our commitment to ethical conduct but also ensure that every transaction conducted on our platform is secure, compliant, and in full accordance with the legal framework.
                    &nbsp;              </p>
                </div>
              </div>
            </div>
          </div>
          <div className="section Investor_Borrower">
            <div className="container">
              <div className="container-fluid">
                <div className="row">
                  <div className="row  text-center mgb-50">
                    <div className="col-lg-12 journey_text">
                      <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Our Journey in Becoming a P2P Platform Operator </h2>
                    </div>
                    <div className="control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <img src={journey} className alt="" />
                    </div>  
                    <div className="disclimar">
                      <div className="control-image mgt-50 wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                        {/*<img src="images/disclimar.png" class="" style="width: 100%;" alt="" />!*/}
                      </div>
                      <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Disclaimer:</h2>
                      <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">Operating Under Securities and Exchange Commission of Pakistan. Securities and Exchange Commission of Pakistan does not accept any responsibility for correctness of any of the statements and representations made or opinions expressed by the platform. SECP also does not provide any assurance for repayment of the investment made on it.</p>
                    </div>
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

export default Licence
