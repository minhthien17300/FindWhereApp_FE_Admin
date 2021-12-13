import React, {SyntheticEvent, useState} from "react";
import { Redirect,Link } from 'react-router-dom';
//import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { get, post } from "../helper/fetch.helper";


const ResetPassword = () => {
    const [redirect, setRedirect] = useState(false);
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const [disabled, setDisable] = useState(false);

    const GetURLParameter = (sParam) =>{
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
          var sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
              return (sParameterName[1].toString());
          }
      }
  }

    const submit = async (e) => {
        e.preventDefault();
        const response = await post('http://localhost:5000/user/resetPassword', { email: email, password:newPassword, confirmPassword:confirmNewPassword, otp:OTP });
        console.log(response);
        
        if (response.success) {
          //làm gì đó
          setRedirect(true);
          alert(response.message);
        }
        else alert(response.message);
    }

    const send = async (e) => {
      e.preventDefault();
      console.log(email);
        const response = await get('http://localhost:5000/user/forgotPassword', { email: email });
        console.log(response);
        
        if (response.success) {
          //làm gì đó
          setDisable(true);
          alert(response.message);
        }
        else alert(response.message);

  }
    if(redirect)
        return <Redirect to="/guest/login"/>;

    return (           
      <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="mb-5">
              <h5 className="card-category">QUÊN MẬT KHẨU</h5>
              <CardTitle tag="h3">
                Hãy điền E-mail của bạn để chúng tôi gửi OTP code giúp bạn Reset Password !
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form onSubmit={send}>
            <div className="form-group">
            <Row>
                    <Col className="pr-md-1" md="9">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          E-mail
                        </label>
                        <Input defaultValue={email} placeholder="Nhập email của bạn" type="email" onChange={e => setEmail(e.target.value.toString())} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <label htmlFor="exampleInputEmail1"></label>
                      <FormGroup>
                      <input id="sendEmail" disabled={disabled} className="btn btn-block login-btn mb-4" type="submit" defaultValue="Submit" value="GỬI"  />
                      </FormGroup>
                    </Col>
                  </Row>
              </div>
              </form>
            <form onSubmit={submit}>
            <div className="form-group">
                 <label>Mật khẩu mới</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="**************"
                    onChange={e => setnewPassword(e.target.value.toString())}
                    />
              </div>
              <div className="form-group">
                 <label>Nhập lại mật khẩu</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="**************"
                    onChange={e => setconfirmNewPassword(e.target.value.toString())}
                    />
              </div>
              <div className="form-group">
                 <label>Mã OTP</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="OTP"
                    onChange={e => setOTP(e.target.value)}
                    />
              </div>
              <input id="resetpass" className="btn btn-block login-btn mb-4" type="submit" defaultValue="Submit" value="XÁC NHẬN" />
              </form>
              {/* <Link to="#!" className="forgot-password-link" textAlign= "left">Forgot password?</Link> */}
              <p className="login-card-footer-text"></p>
              <a href="/guest/login" className="login-card-footer-text">ĐĂNG NHẬP</a>
              <p className="login-card-footer-text"></p>
              {/* <Link to="/" className="text-reset">Back to Home!</Link><p /> */}
              <nav className="login-card-footer-nav">
                <a href="https://www.facebook.com/phamduy.lap.16/">Contact me for more information</a>
              </nav>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    );
};

export default ResetPassword;

