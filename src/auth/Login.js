import React, {SyntheticEvent, useState} from "react";
import { Redirect,Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { get, post } from "../helper/fetch.helper";



const Login = (props) => {
    //const {setName} = props;
    //const tokenadmin = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXZWIgUmV2aWV3IEdhbWUiLCJkYXRhIjp7ImlkIjoiNjE5YjQ4NmY3ODBiZDIzYzIwYzFjYjQ0Iiwicm9sZSI6MX0sImlhdCI6MTYzNzg5ODQyMDU5NywiZXhwIjoxNjM3OTg0ODIwNTk3fQ.M2kFEv8Y1pNxof4c0gD25M4ieibA9yxDbKfkqU7sjI8')
    const [userName, setUsername] = useState('');
    const [userPwd, setPassword] = useState('');
    const [redirect, setRedirect] = useState(-1);

    const submit = async (e) => {
      e.preventDefault();

      const response = await post('https://findwhere-app.herokuapp.com/user/login', { userName: userName, userPwd: userPwd });
      console.log(response);
      if(response.success)
      {
        //setRedirect(true);
        localStorage.setItem("token", response.data.token);
        // const admin = await get('https://findwhere-app.herokuapp.com/user/findUserByToken',{},{"Authorization": "Bearer " + localStorage.getItem("token")})
        // console.log(admin.data.role)
        localStorage.setItem("role", response.data.role)

        if(response.data.role==1) setRedirect(1);
        else if (response.data.role == 2) setRedirect(2);
        else setRedirect(0);
        
        
        console.log(localStorage.getItem("token"));
      }
      else {
        alert(response.message);
      }

     
  }

  const handleUserNameChange = (e) =>{
      setUsername(e.target.value);
  }
  const handlePassChange = (e) =>{
      setPassword(e.target.value);
  }
  if(redirect == 1) return <Redirect to="/admin/products"/>;
  else if(redirect == 2) return <Redirect to="/user/products"/>;

    return (
      <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="mb-5">
              <h5 className="card-category">ĐĂNG NHẬP</h5>
              <CardTitle tag="h3">
                Hãy điền đầy đủ thông tin để ĐĂNG NHẬP !
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form method="post" onSubmit={submit}>
              <div className="form-group">
                 <label>Tài khoản/Email</label>
                  <input 
                    type="text" 
                    name="username" 
                    className="form-control" 
                    placeholder="Your Account"
                    onChange={handleUserNameChange}
                    />
              </div>
                <div className="form-group mb-4">
                  <label>Mật khẩu</label>
                  <input
                    type="password" 
                    name="password"  
                    className="form-control" 
                    data-type="password" 
                    placeholder="***********"
                    onChange={handlePassChange}
                    />
                </div>
                <input id="login" className="btn btn-block login-btn mb-4" type="submit" value="Đăng nhập"/>
              </form>
              <Link to="/guest/resetpassword" className="forgot-password-link" textAlign= "left">Quên mật khẩu?</Link>
              <p className="login-card-footer-text"></p>
              {/* <a href="/guest/register" className="login-card-footer-text">Chưa có tài khoản, hãy ĐĂNG KÝ ?</a> */}
              <p className="login-card-footer-text"></p>
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

export default Login;