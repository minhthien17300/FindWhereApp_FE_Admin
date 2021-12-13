
import React from "react";
import { useState,useEffect } from "react/cjs/react.development";
import ReactPaginate from "react-paginate";
import '../views/pagination.css'
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
  Table,
} from "reactstrap";
import { get, post } from "../helper/fetch.helper";
import Select from "react-dropdown-select";


function DetailModify(props) {
  //comments
  const {_id } = props;
  const commentarray=[
    
  ]
  const types=[]
  const [typearray,setTypeArray]=useState([])
  const [scdtypearray,setScdtypearray]=useState([])
  const termarray=[]
  const scdtermarray=[]

  
  const[image, setImage]=useState('');
  const[imageUpload, setImageUpload]=useState('');
  const[result, setResult]=useState({});

  const [name,setName]=useState('')
  const [publisher,setPublisher]=useState('')
  const [description,setDesciption]=useState('')
  const [redirect, setRedirect]=useState(false);
  const [typesList, setTypesList]=useState([])

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

useEffect(() => {
  (    
      async () => {               
        const id = GetURLParameter('id')
        const response = await get('http://localhost:5000/game/getGameDetail', { id: id });
        console.log(response);
        
        if (response.success) {
          //làm gì đó
          setResult(response.data);
          console.log(result);
          
          response.data.types.forEach(element => {
            let type ={label:element,value:element}
            termarray.push(type)
          });
          setTypeArray(termarray)
          console.log(typearray)
          setImage(response.data.images[0]);

          setName(response.data.name)
          setPublisher(response.data.publisher)
          setDesciption(response.data.description)
          setTypesList(termarray);
        } else {

        }     


        //get game type
        
        const responses = await get('http://localhost:5000/type/getALLType');
            if(responses.success)
            {
              responses.data.forEach(element => {
                let type={
                  label:element.typeName,
                  value:element.typeName,
                }
                scdtermarray.push(type)
              });
              setScdtypearray(scdtermarray)
              console.log(scdtypearray)
            } 
      }
  )();
}, [])

const onArrayChange=(values)=>{
  setTypesList([]);
  setTypesList(values);
}
const submit = async(e)=>{
  e.preventDefault()

  console.log(typesList);
  var types = [];
  typesList.forEach(element => {
    let type = element.value;
    types.push(type);
  });
  console.log(types);
  
  var data=new FormData()
  var id = GetURLParameter('id')
  console.log(id)

  data.append('id',id)
  data.append('name',name)
  data.append('publisher',publisher)
  data.append('description',description)
  for(var i=0; i<types.length; i++){
    data.append('types['+i+']',types[i])
  }
  data.append('images',imageUpload)

  const response =await fetch("http://localhost:5000/game/editGame", 
  {
    method:"POST",
    headers:{
    "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body:data}
  ) 
  var content=await response.json()
  console.log(content)
  setRedirect(true);
  alert(content.message);
}

const handleinput=(e)=>{
  setImageUpload(e.target.files[0]) 
}
console.log(image)

if(redirect) return <Redirect to="/admin/manage-games"/>;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Game Details</h5>
              </CardHeader>
              <form method="post" onSubmit={submit} >
              <CardBody>
                <Form>
                  <Row>
                    
                  <Col  md="12">
                      <FormGroup>
                        <label >
                          Tên Game
                        </label>
                        <Input
                          defaultValue={result.name}
                          onChange={e=>setName(e.target.value)}
                          type="text"
                        />
                        
                      </FormGroup>
                    </Col>
                    
                    <Col  md="12">
                      <FormGroup>
                        <label >
                          Nhà phát hành
                        </label>
                        <Input
                          defaultValue={result.publisher}
                          onChange={e=>setPublisher(e.target.value)}
                          type="text"
                        />
                        
                      </FormGroup>
                    </Col>
                    
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Thể loại</label>
                        <Select 
                        checked={typearray}
                        keepSelectedInList
                        values={typearray}
                        addPlaceholder="+ add"
                        clearable
                        multi
                        options={scdtypearray}
                        onChange={onArrayChange}
                          />

                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Mô tả</label>
                        <Input
                          defaultValue={result.description}
                          cols="80"
                          rows="4"
                          type="textarea"
                          onChange={e=>setDesciption(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col md="9">
                      <label>Hình ảnh</label>
                      <FormGroup>
                        <label>Select image</label>
                        <Input
                          onChange={handleinput}
                          type="file"
                        />
                        
                      </FormGroup>
                      
                    </Col>
                    
                  </Row>
                </Form>
                <Button className="btn btn-primary">Save</Button>
              </CardBody>
              </form>
            </Card>
            
            
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={image}
                    />
                    <h5 className="title">{result.name}</h5>
                  </a>
                </div>
                <div className="card-description">
                {result.description}
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DetailModify;
