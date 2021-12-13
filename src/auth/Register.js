import React, { SyntheticEvent, useState } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const Register = () => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userPwd, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dateofBirth, setDateofBirth] = useState('');
    const [gender, setGender] = useState(0);
    const [confirmPassword, setConfirmpassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        console.log(userName);
        console.log(userPwd);
        console.log(confirmPassword);
        console.log(email);
        console.log(name);
        console.log(phone);
        console.log(gender);
        console.log(dateofBirth);

        const response = 
        await fetch('http://localhost:5000/user/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              userName,
              userPwd,
              confirmPassword,
              email,
              name,
              phone,
              gender,
              dateofBirth
            })
        });

        const content = await response.json();


        console.log(content.status);

        if (content.message === 'Đăng ký thành công')
        {
          setRedirect(true);
        }
        alert(content.message);

    }

    if(redirect)
        return <Redirect to="/admin/login"/>;


    const onChangeOptions1 = (e) =>{
      //setGT(e.target.value);
      setGender(0);
    }
    const onChangeOptions2 = (e) =>{
      //setGT(e.target.value);
      setGender(1);
    }

    const handleSetDOB = (e) =>{
      setDateofBirth(e.target.value.toString());
      //date = Date.parse(dateofBirth.toString());
      //setdoB(new Date(dateofBirth));
    }

    return (
      <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="mb-5">
              <h5 className="card-category">Register</h5>
              <CardTitle tag="h3">
                Hãy điền đầy đủ thông tin để ĐĂNG KÝ !
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form method="post" onSubmit={submit}>
              <div className="form-group">
                 <label>Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    
                    className="form-control" 
                    placeholder="Your Account"
                    onChange={e => setUsername(e.target.value.toString())}
                    />
              </div>
              <div className="form-group">
                 <label>Email</label>
                  <input 
                    type="text" 
                    name="email"
                    className="form-control"
                    data-type="email" 
                    placeholder="Your Email"
                    onChange={e => setEmail(e.target.value.toString())}
                    />
              </div>
              <div className="form-group">
                 <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control"
                    data-type="text" 
                    placeholder="Your Name"
                    onChange={e => setName(e.target.value.toString())}
                    />
              </div>
              <div className="form-group">
                <Row>
                  <Col>
                    <label>Date of Birth</label>
                      <input 
                        className="form-control"
                        //placeholder="dd-mm-yyyy"
                        type="date"
                        onChange={handleSetDOB}
                      />
                  </Col>
                  <Col>
                    <label>Phone</label>
                      <input 
                        defaultValue={dateofBirth}
                        className="form-control"
                        placeholder="Your Phone"
                        //placeholder="dd-mm-yyyy"
                        type="text"
                        onChange={e => setPhone(e.target.value.toString())}
                      />
                  </Col>
                  <Col>
                  <div className="radio-buttons">
                  <label>Gender</label>
                    <Row>
                      <Col className="pl-md-1">
                        </Col>
                      <Col className="pl-md-1">
                        <input 
                          type="radio" 
                          value="male" 
                          name="gender"
                          //checked={gioitinh === 'male'}
                          //defaultChecked name="gender"
                          onChange={onChangeOptions1}
                          /> Male
                      </Col>
                      <Col className="pl-md-1">
                        <input 
                          type="radio" 
                          value="female" 
                          name="gender"
                          //checked={gioitinh === 'female'}
                          // defaultChecked name="gender"
                          onChange={onChangeOptions2}
                          /> Female
                      </Col>
                    </Row>
                  </div>
                  </Col>
                </Row>
              </div>
              <div className="form-group mb-4">
                  <label>Password</label>
                  <input
                    type="password" 
                    name="password"  
                    className="form-control" 
                    data-type="password" 
                    placeholder="**************"
                    onChange={e => setPassword(e.target.value.toString())}
                    />
                </div>
                <div className="form-group mb-4">
                  <label>Confirm Password</label>
                  <input
                    type="password" 
                    name="repassword"  
                    className="form-control" 
                    data-type="password" 
                    placeholder="**************"
                    onChange={e => setConfirmpassword(e.target.value.toString())}
                    />
                </div>
                <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Đăng ký"  />
              </form>
              <Link to="/guest/resetpassword" className="forgot-password-link" textAlign= "left">Forgot password?</Link>
              <p className="login-card-footer-text"></p>
              <a href="/guest/login" className="login-card-footer-text">Login ?</a>
              <p className="login-card-footer-text"></p>
              <Link to="/" className="text-reset">Back to Home!</Link><p />
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

export default Register;