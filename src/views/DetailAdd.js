
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


function DetailAdd() {
  
  const [image,setImage]=useState('')
  const types=[]
  const [typesList, setTypesList]=useState([])
  const [typearray,setTypeArray]=useState([])
  const termarray=[]
  const [name,setName]=useState('');
  const [price, setPrice]=useState();
  //const [publisher,setPublisher]=useState('')
  const [description,setDesciption]=useState('')
  const [redirect, setRedirect]=useState(false);

  useEffect(() => {
    (
        async () => {
            const response = await get('https://findwhere-app.herokuapp.com/type/getALLType');
            if(response.success)
            {
              response.data.forEach(element => {
                let type={
                  label:element.typeName,
                  value:element.typeName,
                }
                termarray.push(type)
              });
              setTypeArray(termarray)
              console.log(typearray)
            }
    }    
    )();
  },[])
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
    data.append('name',name)
    //data.append('publisher',publisher)
    data.append('description',description)
    data.append('price', price)
    for(var i=0; i<types.length; i++){
      data.append('types['+i+']',types[i])
    }
    data.append('images',image)

    const response =await fetch("https://findwhere-app.herokuapp.com/product/addProduct", 
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
    alert(content.message)
  }
  
  const handleinput=(e)=>{
    setImage(e.target.files[0]) 
  }
  console.log(image)

  if(redirect) return <Redirect to="/user/manage-products"/>;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">TH??M S???N PH???M</h5>
              </CardHeader>
              <form method="post" onSubmit={submit} >
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>T??n S???n ph???m</label>
                        <Input
                          
                          
                          placeholder="Product's name"
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
                          Gi??
                        </label>
                        <Input placeholder="Product's price" type="text" 
                        onChange={e=>setPrice(Number.parseInt(e.target.value))}/>
                      </FormGroup>
                    </Col>
                 </Row>
                    <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Ph??n lo???i</label>

                        <Select 
                        keepSelectedInList
                        placeholder="Select genre(s)"
                        addPlaceholder="+ add"
                        clearable
                        multi
                        options={typearray}
                        onChange={onArrayChange}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>M?? t???</label>
                        <Input
                          cols="80"
                          
                          placeholder="Here can be your sumary"
                          rows="5"
                          type="textarea"
                          onChange={e=>setDesciption(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="9">
                      <label>H??nh ???nh</label>
                      <FormGroup>
                        <label>Select image</label>
                        <Input
                          type="file"
                          onChange={handleinput}
                        />
                        
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

export default DetailAdd;
