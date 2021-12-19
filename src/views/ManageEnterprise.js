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
import { Dialog,DialogContentText,DialogTitle,DialogActions,DialogContent } from "@material-ui/core";
import {get, post} from "helper/fetch.helper"

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [id_u, setID] = React.useState('');
    const [isAct, setIsactived] = React.useState(false);
    const [username, setUsername] = React.useState(false);
    const [name, setName] = React.useState(false);

    const loadUsers = async () => {     
      const response = await get('http://localhost:5000/user/getALLEnterprise',{},{
              'Content-Type': 'application/json',
              Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")});
      if(response.success)
      {
        setUsers(response.data);
      } else {
        alert(response.message);
        }
    }    
  

  useEffect(() => {
    loadUsers();
  }, []);
  // const handleCheck_Isactive = (isActived,id) => {
    // if(isActived)
    // {
    //   handleBan(id);
    // }
    // else 
    // {
    //   handleUnBan(id);
    // }
  // }
  
  const handleBan = async (id_user) => {
  
    const response = await post('http://localhost:5000/user/banUser', {id: id_user}, {
      'Content-Type': 'application/json',
      Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")});
  
    if (response.success) {
      alert("Khóa thành công tài khoản: "+username);
      loadUsers();
    } else {
      alert("Có lỗi gì đó xảy ra !")
    }
  }

  const handleUnBan = async (id_user) => {
    const response = await post('http://localhost:5000/user/unbanUser', {id: id_user}, {
      'Content-Type': 'application/json',
      Accept: 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")});
    
    if (response.success) {
      alert("Mở khóa thành công tài khoản: "+username);
      loadUsers();
    } else {
      alert("Có lỗi gì đó xảy ra !")
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose_Cancle = () => {
    setID('');
    setOpen(false);
  };

  const handleClose_Confirm = () => {
    if(isAct)
    {
      handleBan(id_u);
    }
    else 
    {
      handleUnBan(id_u);
    }
    setOpen(false);
    //setID('');
  };

  const[item, setItem]=useState(users.slice(0,50))
  //trang đang active
  const [pagenumber,setpageNumber]=useState(0)
  //giới hạn item
  const itemsPerPage=6
  //logic lấy item cho từng trang
  const prevpage=pagenumber*itemsPerPage
  const displayItems=users.slice(prevpage,prevpage+itemsPerPage).map((item) => {
        
  return(
      
      <>
      <tr>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>Enterprise</td>
        <td>  
          <Button color={item.isActived ?'danger' : 'success'} onClick={()=>handleClickOpen(setID(item._id),setIsactived(item.isActived),setUsername(item.userName),setName(item.name))}><i className={item.isActived ? "fas fa-ban" : "fas fa-unlock"}></i></Button>
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
                          <a>{isAct ? "Bạn có muốn khóa tài khoản này không ?": "Bạn có muốn mở tài khoản này không ?"}</a>
                          <ul></ul>
                          <ul>ID : {id_u}</ul>
                          <ul>Username : {username}</ul>
                          <ul>Name : {name}</ul>
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
const pageCount=Math.ceil(users.length/itemsPerPage)



const changePage=({selected})=>{
  setpageNumber(selected);
}



    
    return (
        <div className="content">
        <Row>
          
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Enterprises</CardTitle>
                <Link to="/admin/add-enterprises" className="btn btn-primary"> Thêm </Link>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {displayItems}
                  </tbody>
                </Table>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default ManageUser
