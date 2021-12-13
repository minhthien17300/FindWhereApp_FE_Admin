import React, {SyntheticEvent, useState} from "react"
import { Redirect,Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";


const ForgotPass = () => {
    const [email, setMail] = useState('');
    const [redirect, setRedirect] = useState(false);
    

    const submit = async (e) => {
        e.preventDefault();

        // const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/forgetpassword',{
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     credentials: 'include',
        //     body: JSON.stringify({
        //         email,
        //     })
        // });

        // const content = await response.json();
        // if(content.status=='200')
        // {
        //     alert(content.message)
        //     return <Redirect to="/login"/>;
        // }
        
        
    }

    // if(redirect)
    //     return <Redirect to="/login" />;

    return (
        <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="mb-5">
              <h5 className="card-category">Forgot Password</h5>
              <CardTitle tag="h3">
                Hãy điền email của bạn để lấy lại mật khẩu !
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form method="post" onSubmit={submit}>
              <div className="form-group">
                 <label>Email</label>
                  <input 
                    type="text" 
                    name="email" 
                    className="form-control"
                    data-type="email" 
                    placeholder="Your Email"
                    onChange={e => setMail(e.target.value)}
                    />
              </div>
                <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" defaultValue="Register"  />
              </form>
              <a href="/admin/login" className="login-card-footer-text">Login?</a>
              <p className="login-card-footer-text"></p>
              <a href="/admin/register" className="login-card-footer-text">Register?</a>
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

export default ForgotPass;