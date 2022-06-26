
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  
} from "reactstrap";
import './pagination.css'
import ReactPaginate from "react-paginate";
import { Icon } from "@material-ui/core";
import {get,post} from "helper/fetch.helper"
import { Dialog,DialogContentText,DialogTitle,DialogActions,DialogContent } from "@material-ui/core";

function Tables() {

  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState('');
  const [products, setProduct] = useState([]);

  const loadProducts = async () => {     
            const response = await get('https://findwhere-app.herokuapp.com/product/getEnterpriseProductSort2',
            {},
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")
            });

            if(response.success)
            {
              setProduct(response.data);
            //   setImage(content.data.images);
            //   setID(content.data._id);
            //   setScore(content.data.score);
            //   setTypes(content.data.types);
              console.log(response.message)
            }
  }    

  useEffect(() => {
    loadProducts();
  }, []);



const handleDelete = async (id) => {
  console.log(id);
  const response = await post('https://findwhere-app.herokuapp.com/product/deleteProduct', {id: id},
  {
    'Content-Type': 'application/json',
    Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")});
  console.log(response);
  alert(response.message);
  loadProducts()
}

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose_Cancle = () => {
  setID('');
  setOpen(false);
};

const handleClose_Confirm = () => {
  handleDelete(id);
  setOpen(false);
  //setID('');
};


const[item, setItem]=useState(products.slice(0,50))
//trang đang active
const [pagenumber,setpageNumber]=useState(0)
//giới hạn item
const itemsPerPage=6
//logic lấy item cho từng trang
const prevpage=pagenumber*itemsPerPage
const displayItems=products.slice(prevpage,prevpage+itemsPerPage).map((item) => {
        
  return(
      
      <>
      <tr>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        {/* <td>{item.review}</td> */}
        <td>{item.score}</td>
        <td>{item.types.map((type) => <li>{type}</li>)}</td>
        <td>  
          <Link to={`/detail-modify?id=${item._id}`} className="btn btn-primary"><i className="fas fa-pen"></i></Link>
          <Button color='danger' onClick={()=>handleClickOpen(setID(item._id))}><i className="fas fa-trash" ></i></Button>
          <Dialog
                      open={open}
                      onClose={handleClose_Cancle}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <a>{"Bạn có muốn xóa Product này không ?"}</a>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose_Cancle}>Hủy</Button>
                        <Button onClick={handleClose_Confirm} autoFocus>
                          Đồng ý
                        </Button>
                      </DialogActions>
                    </Dialog>
        </td>
        
      </tr>
      </>
  )
})
const pageCount=Math.ceil(products.length/itemsPerPage)



const changePage=({selected})=>{
  setpageNumber(selected);
}


  return (
    <>
      <div className="content">
        <Row>
          
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">SẢN PHẨM</CardTitle>
                <Link to="/user/add-products" className="btn btn-primary"> Thêm </Link>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th scope="col">Tên Sản phẩm</th>
                      <th scope="col">Mô tả</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Điểm số</th>
                      <th scope="col">Phân loại</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayItems}
                  </tbody>
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
                  
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
