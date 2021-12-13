
import React,{useState,useEffect} from "react";
import {get,post} from 'helper/fetch.helper'
import { Redirect,Link } from "react-router-dom";
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


function EnterpriseAdd() {
  
  const [name,setName]=useState('')
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [lat,setLat]=useState('')
  const [lng,setLng]=useState('')
  const [redirect, setRedirect]=useState(false);

  const submit = async(e)=>{
    e.preventDefault()
    
    const response = await post('http://localhost:5000/user/addEnterprise', 
    { name: name, userName: userName, email: email, phone: phone, lat: lat, lng: lng },
    {
        'Content-Type': 'application/json',
        Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")
    });
    console.log(response);
    alert(response.message);
    if(response.success) {
        setRedirect(true);
    }
  }

  if(redirect) return <Redirect to="/admin/manage-enterprises"/>;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
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
                          onChange={e=>setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    
                 </Row>
                 <Row>
            

                    <Col  md="12">
                      <FormGroup>
                        <label >
                          User Name
                        </label>
                        <Input placeholder="Nhập tên tài khoản doanh nghiệp" type="text" 
                        onChange={e=>setUserName(e.target.value)}/>
                      </FormGroup>
                    </Col>
                 </Row>
                  
                  <Row>
                    <Col  md="12">
                      <FormGroup>
                        <label >
                          Email
                        </label>
                        <Input placeholder="Nhập email doanh nghiệp" type="text" 
                        onChange={e=>setEmail(e.target.value)}/>
                      </FormGroup>
                    </Col>

                    <Col  md="12">
                      <FormGroup>
                        <label >
                          Số điện thoại
                        </label>
                        <Input placeholder="Nhập số điện thoại doanh nghiệp" type="text" 
                        onChange={e=>setPhone(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col  md="12">
                      <FormGroup>
                        <label >
                          LAT
                        </label>
                        <Input placeholder="Nhập kinh độ doanh nghiệp" type="text" 
                        onChange={e=>setLat(e.target.value)}/>
                      </FormGroup>
                    </Col>

                    <Col  md="12">
                      <FormGroup>
                        <label >
                          LNG
                        </label>
                        <Input placeholder="Nhập vĩ độ doanh nghiệp" type="text" 
                        onChange={e=>setLng(e.target.value)}/>
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
