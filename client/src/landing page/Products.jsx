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




import productSlider from "./images/productslide.png" 
import p2p from "./images/investImg.png"
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
import Navbar from '../features/landingpage-navbar/Navbar'




const Products = () => {
    const navigate = useNavigate()
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

  return (
      <div>
        <Navbar/>
          <div className="section productSection" style={{marginTop: '80px'}}>
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-4 control-text">
                <div className="product-text wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div>Discover<br />
                    The <span>New<br />
                      Investing options</span><br />
                    In Pakistan</div>
                  <p>Learn about our products and how
                    peer-to-peer financing works</p>
                  {/* <a href="#secureGrow" style={{textDecoration: 'none'}} className="btn primarybtn">
                    Learn more
                  </a> */}
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-8 control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={productSlider} className="img-fluid" alt="Responsive Image" />
                <button style={{textAlign: 'center'}} className="btn primarybtn show-mobile margin-mobile-top20" type="submit">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>


      <div className="section aboutSection">
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6  control-image wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                <img src={p2p} className="img-fluid" alt="Responsive Image" />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 about-text  control-text  ">
                <h2 className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '1s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <span className="textEffect" />
                  Paraphrasing <strong>P2P Financing</strong></h2>
                <p className="wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s', fontSize: '16px', lineHeight: '26px'}} data-wow-delay="0.05s">
                Peer-to-peer finance, or crowd-funding, is a cutting-edge financial concept that enables direct lending and borrowing between people or companies over an online platform without the need for incumbents and middlemen.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="mgt-50 productFinance">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6  ">
                  <div className="financeBox">
                    <div className="financeBoxInner wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <img src={Group26849} className alt="Responsive Image" />
                      <h4>Who Make Up The Investors?</h4>
                      <p>Any organization or person looking to increase their profits can participate in peer-to-peer finance as an investor.</p>
                      {/* <a href="https://app.finjainvest.com/" style={{textDecoration: 'none'}} className="primarybtn">
                        Ready to Invest?
                      </a>  */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6  ">
                  <div className="financeBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="financeBoxInner wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <img src={Group26850} className alt="Responsive Image" />
                      <h4>Who Take Up The Loans?</h4>
                      <p>Peer-to-peer finance allows almost anyone who is looking for money to potentially become a borrower.</p>
                      <button className="primarybtn" type="submit">
                        Apply for Financing now!  
                      </button>  
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

      <div>
        <div className="section rapidGrowSections" id="rapidGrow">
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="row  mgb-50 text-center">
                  <div className="col-lg-12 sectionHeading">
                    <h2 className=" wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                      <span className="textEffect" />
                      What is <strong>FastGrow</strong> &amp; and How Does It Operate?</h2>
                  </div>
                  <p className="peragraphText wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '1s', animationDelay: '0.05s'}} data-wow-delay="0.05s">With RapidGrow, you may experience the power of growth. In a short amount of time, earn monthly returns that give you a consistent source of income. Perfect for people who want to swiftly reach their financial objectives and seek steady earnings. Become responsible for your financial future.</p>
                </div>
                <div className="col-sm-6 col-md-4 text-center   ">
                  <div className="rapidBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="rapidImg">
                      <img src={step1} alt="step1" style={{paddingTop: '18px'}} />
                    </div>
                    <h5>Step 1</h5>
                    <p>Investors add their capital to the Invest Bachat account</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 text-center">
                  <div className="rapidBox  wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="rapidImg">
                      <img src={step2} alt="step1" />
                    </div>
                    <h5>Step 2</h5>
                    <p>Invest Bachat we the capital in multiple borrowers seeking financing for 30 days</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 text-center">
                  <div className="rapidBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="rapidImg">
                      <img src={step3} alt="step1" />
                    </div>
                    <h5>Step 3</h5>
                    <p>The Borrower utilizes the funds to grow their business</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 text-center">
                  <div className="rapidBox  wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="rapidImg">
                      <img src={step4} alt="step1" />
                    </div>
                    <h5>Step 4</h5>
                    <p>The borrower returns the capital along with the profit at the end of investment term</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 text-center">
                  <div className="rapidBox  wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="rapidImg">
                      <img src={step5} alt="step1" />
                    </div>
                    <h5>Step 5</h5>
                    <p>The capital along with profit is disbursed to the investors account after the maturity</p>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 text-center">
                  <div className="rapidBox  wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                    <div className="rapidImg">
                      <img src={step6} alt="step1" style={{paddingTop: '35px'}} />
                    </div>
                    <h5>Step 6</h5>
                    <p>Investor can choose to reinvest or withdraw their funds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mgb-50 text-center">
          {/* <a href="https://app.finjainvest.com/" className="primarybtn wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s', textDecoration: 'none'}} data-wow-delay="0.05s" type="submit">
            Invest Now
          </a> */}
        </div>
      </div>


    
      <div className="section wantToKnowSection">
        <div className="container">
          <div className="container-fluid">
            <div className="row">
              <div className="row mgb-50 text-center">
                <div className="col-lg-12 sectionHeading">
                <h2 className="text-4xl font-bold">
                      <span>You might <span className="text-indigo-400">want to know </span></span>
                    </h2>
                </div>
              </div>
              <div className="col-sm-12 col-sm-6 col-md-4 col-lg-4  ">
                <div className="wantToKnowBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="wantToKnowBoxInner">
                    <div className="imgBoxGroup">
                      <div className="wantToKnowImg">
                        <img src={w1} className alt="Responsive Image" />
                      </div>
                      <div className>
                        <h4>Return Rates</h4>
                      </div>
                    </div>
                    <p>P2P financing can provide higher returns than savings and other investments. It’s a great way to diversify your portfolio.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-sm-6 col-md-4 col-lg-4  ">
                <div className="wantToKnowBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="wantToKnowBoxInner">
                    <div className="imgBoxGroup">
                      <div className="wantToKnowImg">
                        <img src={w2} className alt="Responsive Image" />
                      </div>
                      <div className>
                        <h4>Return of Capital</h4>
                      </div>
                    </div>
                    <p>Invest Bachat collects borrower’s repayments and passes them on to investors at set intervals. </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-sm-6 col-md-4 col-lg-4  ">
                <div className="wantToKnowBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="wantToKnowBoxInner">
                    <div className="imgBoxGroup">
                      <div className="wantToKnowImg">
                        <img src={w3} className alt="Responsive Image" />
                      </div>
                      <div className>
                        <h4>Financing Risk Rates</h4>
                      </div>
                    </div>
                    <p>Whenever a borrower applies for financing, it is mandatory for all financing platforms to practice a vigorous.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-sm-6 col-md-4 col-lg-4  ">
                <div className="wantToKnowBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="wantToKnowBoxInner">
                    <div className="imgBoxGroup">
                      <div className="wantToKnowImg">
                        <img src={w4} className alt="Responsive Image" />
                      </div>
                      <div className>
                        <h4>Privacy</h4>
                      </div>
                    </div>
                    <p>The platform operator looks after the privacy of user information.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-sm-6 col-md-4 col-lg-4  ">
                <div className="wantToKnowBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="wantToKnowBoxInner">
                    <div className="imgBoxGroup">
                      <div className="wantToKnowImg">
                        <img src={w5} className alt="Responsive Image" />
                      </div>
                      <div className>
                        <h4>Laws &amp; Regulations</h4>
                      </div>
                    </div>
                    <p>Invest Bachat is licensed and regulated by the Securities and Exchange Commission of Pakistan.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-sm-6 col-md-4 col-lg-4  ">
                <div className="wantToKnowBox wow fadeInDown" style={{animationPlayState: 'running', animationDuration: '0.05s', animationDelay: '0.05s'}} data-wow-delay="0.05s">
                  <div className="wantToKnowBoxInner">
                    <div className="imgBoxGroup">
                      <div className="wantToKnowImg">
                        <img src={w6} className alt="Responsive Image" />
                      </div>
                      <div className>
                        <h4>Better Investment Asset</h4>
                      </div>
                    </div>
                    <p>Based on a simple idea of financing, Peer-to-peer financing platforms use cutting-edge technology to connect borrowers.</p>
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
  )
}

export default Products
