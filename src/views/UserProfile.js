
import { get, post } from "helper/fetch.helper";
import React, { SyntheticEvent, useState, useEffect } from "react"

// reactstrap components
import {
  Button,
  Card,
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
//

import GMap from './GMap';

// API key of the google map
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_API_KEY;

// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}

//

function UserProfile() {
  //const token = localStorage.getItem('token');
  //const AuthStr = 'Bearer '.concat(token);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [dateofBirth, setdoB] = useState('');
  const [gender, setGender] = useState('');
  //Date({ dateFormat: 'mm-dd-yyyy'});
  const [redirect, setRedirect] = useState();
  const [gioitinh, setGT] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  var sex;
  //const [dateofBirth, setDate] = useState(Date);
  //var gd_female = false;
  var date;

  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    (
      async () => {
        
        /*const response = await fetch('http://localhost:5000/user/findUserByToken',{
            method: 'GET',
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        });
        const content = await response.json();*/
        const response = await get('http://localhost:5000/user/findUserByToken', {}, { "Authorization": "Bearer " + localStorage.getItem("token") });
        if (response.success) {
          var d = response.data.dateofBirth;

          setName(response.data.name);
          setEmail(response.data.email);
          setUsername(response.data.userName);
          setPhone(response.data.phone);
          setGender(response.data.gender.toString());
          setLat(response.data.lat);
          setLng(response.data.lng);
          console.log(gender);

          setdoB(new Date(d).toISOString().split("T")[0]);
        }
        if (response.data.gender.toString() === '0') {
          setGT('male');
        }
        else {
          setGT('female');
        }
        //console.log(gd);
        loadGoogleMapScript(() => {
          setLoadMap(true)
        });
      }
    )();
  }, [])


  const onChangeOptions1 = (e) => {
    setGT(e.target.value);
    setGender(0);
  }
  const onChangeOptions2 = (e) => {
    setGT(e.target.value);
    setGender(1);
  }

  const handleRadioButton_Male = (e) => {
    setGender(0);
  }
  const handleRadioButton_Female = (e) => {
    setGender(1);
  }

  const handleSetDOB = (e) => {
    setdoB(e.target.value.toString());
    //date = Date.parse(dateofBirth.toString());
    //setdoB(new Date(dateofBirth));
  }

  const Save = async (e) => {
    // console.log(typeof(name));
    // console.log(typeof(email));
    // console.log(typeof(phone));
    // console.log(typeof(gender));
    // console.log(typeof(dateofBirth));
    e.preventDefault();
    /* const response = await fetch('http://localhost:5000/user/changeInfo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")},
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          gender: gender,
          dateofBirth: dateofBirth,
          lat: lat,
          lng: lng
        })
    }); */

    const response = await post('http://localhost:5000/user/changeEnterpriseInfo',
      {
        name: name,
        //email: email,
        phone: phone,
        gender: gender,
        dateofBirth: dateofBirth,
        lat: lat,
        lng: lng
      },
      {
        'Content-Type': 'application/json',
        Accept: 'application/json', "Authorization": "Bearer " + localStorage.getItem("token")
      });

    //const content = await response.json();

    if (response.success) {
      setRedirect(true);
      console.log("Success");
    }
    else console.log("Fail!");
    alert(response.message)
  }

  return (
    <>
      <div className="content">
        <form onSubmit={Save}>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">THÔNG TIN TÀI KHOẢN</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Tài khoản</label>
                          <Input
                            defaultValue={username}
                            placeholder="Username"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email
                          </label>
                          <Input defaultValue={email} placeholder={email} type="email" onChange={e => setEmail(e.target.value.toString())} readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Tên</label>
                          <Input
                            defaultValue={name}
                            placeholder=""
                            type="text"
                            onChange={e => setName(e.target.value.toString())}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Ngày sinh/Ngày tham gia hệ thống</label>
                          <Input
                            defaultValue={dateofBirth}
                            //placeholder="dd-mm-yyyy"
                            type="date"
                            onChange={handleSetDOB}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                    <Col className="pl-md-1" md="12">
                      <Row>
                      <Col  className="pl-md-1" md="1">
                        </Col>
                        <Col  className="pl-md-1" md="2">
                        <label>Gender</label>
                        </Col>
                        <Col className="pl-md-1" md="3">
                          </Col>
                          <Col className="pl-md-1" md="3">
                            <Input type="radio" value="MALE" name="gender"/> Male
                          </Col>
                          <Col className="pl-md-1" md="3">
                            <Input type="radio" value="FEMALE" name="gender"/> Male
                          </Col>
                      </Row>
                    </Col>
                  </Row> */}
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Số điện thoại</label>
                          <Input defaultValue={phone} placeholder={phone} type="text" onChange={e => setPhone(e.target.value.toString())} />
                        </FormGroup>
                      </Col>
                      {/* <Col className="px-md-1" md="0,5">
                      <FormGroup>
                      </FormGroup>
                    </Col> */}
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Giới tính</label>
                          <div className="radio-buttons">
                            <Row>
                              <Col className="pl-md-1">
                              </Col>
                              <Col className="pl-md-1">
                                <Input
                                  type="radio"
                                  value="male"
                                  name="gender"
                                  checked={gioitinh === 'male'}
                                  //defaultChecked name="gender"
                                  onChange={onChangeOptions1}
                                /> Nam
                              </Col>
                              <Col className="pl-md-1">
                                <Input
                                  type="radio"
                                  value="female"
                                  name="gender"
                                  checked={gioitinh === 'female'}
                                  // defaultChecked name="gender"
                                  onChange={onChangeOptions2}
                                /> Nữ
                              </Col>
                            </Row>
                          </div>
                        </FormGroup>
                      </Col>
                      {/* <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Số điện thoại</label>
                        <Input defaultValue={phone} placeholder={phone} type="text" onChange={e => setPhone(e.target.value.toString())}/>
                      </FormGroup>
                    </Col> */}
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Kinh độ</label>
                          <Input
                            defaultValue={lat}
                            placeholder="Nhập Kinh độ"
                            type="text"
                            onChange={e => setLat(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Vĩ độ</label>
                          <Input
                            defaultValue={lng}
                            placeholder="Nhập Vĩ độ"
                            type="text"
                            onChange={e => setLng(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>
                            Map
                          </label>
                          <div>
                            <a href="https://www.google.com/maps/">Open the Google Map</a>
                          </div>
                          <div className="App">
                            {!loadMap ? <div>Loading...</div> : <GMap lat={lat} lng={lng} />}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type='submit'>
                    Lưu
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
