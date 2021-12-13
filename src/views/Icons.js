
import React, { useState,useEffect } from "react";
// reactstrap components
//import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardColumns,
  CardGroup,
  CardDeck,
  CardLink,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col,
  Input,
  InputGroup,
  FormGroup
} from 'reactstrap';
import ReactPaginate from "react-paginate";
import './pagination.css'

import { Link } from "react-router-dom";
import Detail from "./ProductDetail/Detail";
import {get} from "helper/fetch.helper"






function Icons() {

    
    const [products, setProduct] = useState([]);
    const [name, setName] = useState('');

    // const [images, setImage] = useState([]);
    // const [_id, setID] = useState('');
    // const [score, setScore] = useState('');
    // const [types, setTypes] = useState([]);

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])


    useEffect(() => {
        (
            async () => {
                const role = localStorage.getItem("role");
                
                var response = await get('http://localhost:5000/product/getProductSort');
                
                if(role == 2) {
                    response = await get('http://localhost:5000/product/getEnterpriseProductSort',
                    {},
                    {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")
                    });
                } 

                console.log(response);
    
                if(response.success)
                {
                  setProduct(response.data);
                //   setImage(content.data.images);
                //   setID(content.data._id);
                //   setScore(content.data.score);
                //   setTypes(content.data.types);
                  console.log(response.message)
                } else {
                    alert(response.message);
                }

                //console.log(gd);
        }    
        )();
    },[])

    const search = async(e) => {
        e.preventDefault()

        const response = await get('http://localhost:5000/product/findProductByName', { name: name });
        console.log(response);
        if (response.success) {
            setProduct(response.data);
        } else {
            alert(response.message)
        }
    }
    

    const[item, setItem]=useState(products.slice(0,50))
    //trang đang active
    const [pagenumber,setpageNumber]=useState(0)

    //giới hạn item
    const itemsPerPage=6
    const prevpage=pagenumber*itemsPerPage

    //render item theo số lượng cố định từng trang
    const displayItems=products.slice(prevpage,prevpage+itemsPerPage).map((item) => {
        
        return(
            <Col xs="12" md="4">
                <Card>
                    <CardImg top width="100%" height="350px" style={{objectFit:"cover"}}  src={item.images[0]} />
                    <CardBody>
                        <CardTitle> {item.name}</CardTitle>
                        <CardSubtitle>Phân loại :{item.types.map((type) => <li>{type}</li>)}</CardSubtitle>
                        <CardText>Điểm số : {item.score}</CardText>
                        {/* <CardText>Overall: {item.review}</CardText> */}
                        <Link to={`/detail-item?id=${item._id}`} className="btn btn-secondary"> View </Link>
                    </CardBody>
                </Card>
            </Col>
        )
    })
    const pageCount=Math.ceil(products.length/itemsPerPage)

    
    
    const changePage=({selected})=>{
        setpageNumber(selected);
    }

    return (
        <div className="content">
            
            <Row>
                <Col>
                <FormGroup className="search-bar">
                    <Row>
                        <Col>
                            <Input 
                                placeholder="SEARCH" 
                                type="text" 
                                onChange={e=> setName(e.target.value)}
                            /> 
                         </Col>
                         <Col>
                            <Button
                                aria-label="Search"
                                className="search"
                                onClick={search}
                                >
                                <i className="tim-icons icon-zoom-split" />
                            </Button>
                         </Col>

                    </Row>
                </FormGroup>
                </Col>
            </Row>
            <Row xs="12" md="4">
                <Col md="12">
                    
                    <Row>
                        {displayItems}
                        
                    </Row>
                    <ReactPaginate
                         previousLabel={"<"}
                         nextLabel={">"}
                         pageCount={pageCount}
                         onPageChange={changePage}
                         containerClassName={"paginationBttns"}
                         previousLinkClassName={"previousBttn"}
                         nextLinkClassName={"nextBttn"}
                         disabledClassName={"paginationDisabled"}
                         activeClassName={"paginationActive"}
                         onClick={useEffect}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Icons;
