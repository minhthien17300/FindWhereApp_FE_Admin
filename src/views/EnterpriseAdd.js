
import React, { useState, useEffect } from "react";
import { get, post } from 'helper/fetch.helper'
import { Redirect, Link } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
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
import Select from "react-dropdown-select";
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

function EnterpriseAdd() {

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [redirect, setRedirect] = useState(false);

  //

  const [loadMap, setLoadMap] = useState(false);
  //const [clicks, setClicks] = React.useState<window.google.maps.LatLng>([]);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);

  //
  const submit = async (e) => {
    e.preventDefault()

    const response = await post('https://findwhere-app.herokuapp.com/user/addEnterprise',
      { name: name, userName: userName, email: email, phone: phone, lat: lat, lng: lng },
      {
        'Content-Type': 'application/json',
        Accept: 'application/json', "Authorization": "Bearer " + localStorage.getItem("token")
      });
    console.log(response);
    alert(response.message);
    if (response.success) {
      setRedirect(true);
    }
  }

  if (redirect) return <Redirect to="/admin/manage-enterprises" />;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Add Enterprise</h5>
              </CardHeader>
              <form method="post" onSubmit={submit} >
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Tên Doanh nghiệp</label>
                          <Input


                            placeholder="Nhập tên Doanh nghiệp"
                            type="text"
                            onChange={e => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lassName="pl-md-1" md="6">
                        <FormGroup>
                          <label >
                            User Name
                          </label>
                          <Input placeholder="Nhập tên tài khoản doanh nghiệp" type="text"
                            onChange={e => setUserName(e.target.value)} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label >
                            Email
                          </label>
                          <Input placeholder="Nhập email doanh nghiệp" type="text"
                            onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label >
                            Số điện thoại
                          </label>
                          <Input placeholder="Nhập số điện thoại doanh nghiệp" type="text"
                            onChange={e => setPhone(e.target.value)} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label >
                            Kinh độ
                          </label>
                          <Input placeholder="Nhập kinh độ doanh nghiệp" type="text"
                            onChange={e => setLat(e.target.value)} />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label >
                            Vĩ độ
                          </label>
                          <Input placeholder="Nhập vĩ độ doanh nghiệp" type="text"
                            onChange={e => setLng(e.target.value)} />
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
                          {!loadMap ? <div>Loading...</div> : <GMap lat={10.84965841619966} lng={106.7711747326735} />}
                        </div>
                    </FormGroup>
                    </Col>
                  </Row>

                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" >
                  Save
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Col>

      </Row>
    </div>
    </>
  );
}

export default EnterpriseAdd;
