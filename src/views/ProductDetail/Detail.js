
import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import ReactPaginate from "react-paginate";
import '../pagination.css'
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
import { get, post } from "../../helper/fetch.helper";

function Detail(props) {
  //comments
  const { _id } = props;
  const commentarray = [

  ]
  const [comments, setcomments] = useState(commentarray.slice(0, 50))
  const [pagenumber, setpageNumber] = useState(0)
  const cmtPerPage = 3
  const prevpage = pagenumber * cmtPerPage
  const [evaluateExist, setExist] = React.useState(false);
  const [score, setScore] = useState('');
  const [types, setTypes] = useState('');
  const [image, setImage] = useState('');
  const [result, setResult] = useState({});
  const [evaluates, setEvaluates] = useState([]);
  const [userEvaluate, setUserEvaluate] = useState({});
  const [userScore, setUserScore] = useState();
  const [userReview, setUserReview] = useState('');
  const [enterpriseName, setEnterpriseName] = useState('');

  const [isBan, setIsBan] = useState(false);

  const GetURLParameter = (sParam) => {

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
        const response = await get('http://localhost:5000/product/getProductDetail', { id: id });
        console.log(response);

        if (response.success) {
          //làm gì đó
          setResult(response.data);
          console.log(result);
          let productTypes = "|| ";
          response.data.types.forEach(element => {
            productTypes = productTypes + element.toString() + " || ";
          });
          setTypes(productTypes);
          setScore(response.data.score.toString() + "/5");
          setImage(response.data.images[0]);

          //get product comment
          const eResponse = await get('http://localhost:5000/evaluate/getEvaluateOfProduct', { gID: id });
          console.log(eResponse);

          if (eResponse.success) {
            //làm gì đó
            setEvaluates(eResponse.data);
          } else {
            alert(response.message);
          }

          //get enterprise name
          const uResponse = await get('http://localhost:5000/user/getEnterpriseByID', { id: response.data.eID });
          console.log(uResponse);

          if (uResponse.success) {
            //làm gì đó
            setEnterpriseName(uResponse.data.name);
          } else {
            alert(uResponse.message);
          }
        } else {
          alert(response.message);
        }




        /* if (localStorage.getItem("token") == null) {
          let userEva = {
            score: "",
            comment: "Bạn chưa đăng nhập!",
          }
          setUserEvaluate(userEva);
        } else {
          //get user comment
          const uResponse = await get('http://localhost:5000/evaluate/getUserEvaluate', { gID: id }, {
            'Content-Type': 'application/json',
            Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")});
          console.log(uResponse);

          if (uResponse.success) {
            setUserEvaluate(uResponse.data);
            setExist(true);
            setUserScore(uResponse.data.score);
            setUserReview(uResponse.data.comment);
            console.log(evaluateExist);
          } else {
            let userEva = {
              score: "",
              comment: uResponse.message,
            }
            setUserEvaluate(userEva);
          }
        } */
      }
    )();
  }, [])


  const submit = async (e) => {
    e.preventDefault();

    const id = GetURLParameter('id')
    console.log(id);

    if (!evaluateExist && localStorage.getItem("token") != null) {
      const response = await post('http://localhost:5000/evaluate/addEvaluate', { gID: id, score: userScore, comment: userReview }, {
        'Content-Type': 'application/json',
        Accept: 'application/json', "Authorization": "Bearer " + localStorage.getItem("token")
      });
      console.log(response);
      alert(response.message);

      if (response.message === "Bạn đã bị khóa tài khoản do liên tục vi phạm nguyên tắc đánh giá của ReviewGame! Nếu có bất cứ thắc mắc nào xin liên hệ email: phamduylap123456@gmail.com") {
        setIsBan(true);
      }
    } else if (evaluateExist) {
      const response = await post('http://localhost:5000/evaluate/editEvaluate', { gID: id, score: userScore, comment: userReview }, {
        'Content-Type': 'application/json',
        Accept: 'application/json', "Authorization": "Bearer " + localStorage.getItem("token")
      });
      console.log(response);
      alert(response.message);

      if (response.message === "Bạn đã bị khóa tài khoản do liên tục vi phạm nguyên tắc đánh giá của ReviewGame! Nếu có bất cứ thắc mắc nào xin liên hệ email: phamduylap123456@gmail.com") {
        setIsBan(true);
      }
    } else {
      alert("Bạn phải đăng nhập để tiến hành đánh giá");
    }
  }

  if (isBan) return <Redirect to="/guest/login" />;

  const displayCmt = evaluates.slice(prevpage, prevpage + cmtPerPage).map((item) => {
    return (
      <Form >
        <Row>
          <Col className="pr-md-1" md="6">
            <FormGroup>
              <label>{item.name}</label>

              <div className="form-control">
                {new Date(item.dateEvaluate).toISOString().split("T")[0]}

              </div>
            </FormGroup>
          </Col>
          <Col className="pl-md-1" md="6">
            <FormGroup>
              <label>Điểm số</label>

              <div className="form-control">
                {item.score}/5

              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <div className="form-control">
                {item.comment}

              </div>
            </FormGroup>
          </Col>
        </Row>
      </Form>

    )
  })

  const pageCount = Math.ceil(evaluates.length / cmtPerPage)

  const changePage = ({ selected }) => {
    setpageNumber(selected);
  }

  const handleScoreChange = (e) => {
    setUserScore(e.target.value);
  }

  const handleReviewChange = (e) => {
    setUserReview(e.target.value);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">THÔNG TIN SẢN PHẨM</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>

                    <Col md="12">
                      <FormGroup>
                        <label >
                          Công ty cung cấp
                        </label>
                        <div className="form-control">
                          {enterpriseName}

                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>

                    <Col md="12">
                      <FormGroup>
                        <label>Điểm người dùng</label>

                        <div className="form-control">
                          {score}

                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Phân loại</label>

                        <div className="form-control">
                          {types}

                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Giá</label>
                        <div className="card-description">
                          {result.price}

                        </div>
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>

                  </Row>
                </Form>
              </CardBody>

            </Card>
            {/* <Card>
              <Form method="post" onSubmit={submit}>
              <CardBody>
                <Form>
                <Row>
                    <Col  md="12">
                      <FormGroup>
                        <label>Your Score</label>
                        
                        <Input
                          onChange={handleScoreChange}
                          defaultValue={userEvaluate.score}
                          placeholder="On a scale of 10"
                          type="number"
                          max="10"
                          min="0"
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                      <label>Your review</label>
                      <Input
                          onChange={handleReviewChange}
                          defaultValue={userEvaluate.comment}
                          placeholder="Here can be your review"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>

              </CardBody>
              <CardFooter>
                <Input id="submit" className="btn-fill btn btn-primary" color="primary" type="submit" value="Submit"/>
                <Link type="submit" className="btn-fill btn btn-primary" color="primary">Submit</Link>
              </CardFooter>
              </Form>
            </Card> */}
            <Card>
              <CardHeader> Đánh giá</CardHeader>
              <CardBody>

                {displayCmt}


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


                />

              </CardBody>
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
                  {result.price}
                </div>
              </CardBody>
              <CardFooter>
                {/* <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Detail;
