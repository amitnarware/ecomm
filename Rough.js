import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import "./User.css"
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import {Switch} from '@mui/material'
import AddUser from './AddUser';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
//import SearchIcon from '@mui/icons-material/Search';

import {
  UilTimes,
  UilEdit
} from "@iconscout/react-unicons";

const User=()=>
{
const [show, setShow] = useState(false); //For update Modal
const [show1, setShow1] = useState(false); //For Role Assign Modal
const [view, setView] = useState(false); //For View Modal 
const[empData, setEmpData] =useState([])
const[roleData, setRoleData] =useState([])
const[roleAssign, setRoleAssign] =useState([])

//////////////////////GET//////////////////////////
const getData=async()=>
 {
    let response = await axios.get('http://localhost:3200/api/admin/userlist')
    console.log(response)
    setEmpData(response.data)
 }
 useEffect(()=>{
  getData()
 },[])

 //////////////////////GET ROLE DATA/////////////////////////
const getRoleData=async()=>
{
   let response = await axios.get('http://localhost:3200/api/admin/userlist')
   console.log(response)
   setRoleData(response.data)
}
useEffect(()=>{
 getRoleData()
},[])

///////////////////////for get assigned roles //////////////
async function aroles(uid,eid){
  let response = await axios.get(`http://localhost:3200/api/admin/userlist`);
  console.log(response,eid)
  setRoleAssign(response.data)
  handleShow2()
  setNewEid(uid);
}

/////////for status Toggle Button///////////////////
async function activestatus(uid){
  let response = await axios.put(`http://localhost:3200/api/admin/statuschange/${uid}`);
  console.log(response)
}

async function deactivestatus(uid){
  let response = await axios.put(`http://localhost:3200/api/admin/statuschange/${uid}`);
  console.log(response)
}

/////////////DELETE/////////////////////////
async function deleteRole(id,rid){
  let response = await axios.delete(`http://localhost:5500/api/admin/removerole?id=${id}&role_id=${rid}`);
  console.log(response);
}

////////////Below 4 States are for update////////////

const [neweid, setNewEid] = useState("")
const [newename, setNewEname] = useState("")
const [newRole, setNewRole] = useState("")
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleClose1 = () => setShow1(false);
const handleShow1 = () => setShow1(true);
const handleClose2 = () => setView(false);
const handleShow2 = () => setView(true);

async function updateData(eid, ename, dept, sal){
  console.log(eid, ename, dept, sal)
  setNewEid(eid);
  setNewEname(ename);
  handleShow()
}

async function setRole(eid, ename,role, dept, sal){
  console.log(eid, ename, role,dept, sal)
  setNewEid(eid);
  setNewEname(ename);
  setNewRole(role);
  handleShow1()
}

async function saveUpdatedData(){
  let response = await axios.patch(`http://localhost:5500/api/admin/userfind/:name`, {
    "name": newename,
    })
    console.log(response)
}
// /api/admin/roles/updateroles/:roleid
async function saveRole(){
  let response = await axios.post(`http://localhost:3200/api/admin/roles/newrole`, {
    "id": neweid,
    "role_id": newRole,
    })
    console.log(response)
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
    },
  },
}));
  return (
    <>
    <h1 style={{textAlign:'center', paddingTop:'10px'}}>USERS LIST</h1>
    <div style={{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    }}>
    <AddUser/>
    <Search style={{marginLeft:'1000px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
    </Search>
    </div>
    <div className='usersBox'>
        <div className='tables'>
      <Table striped >
        <thead>
          <tr>
            <th>USER ID</th>
            <th>USER NAME</th>
            {/* <th>PASSWORD</th> */}
            <th>PHOTO</th>
            <th>EMAIL</th>

            <th>ADDRESS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
        {
    empData.map((item,index) =>
    { 
        return(
            <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        {/* <td>{item.password}</td> */}
        <td>{moment(item.createdon).format('Do MMMM YYYY')}
            <br/>
            {moment(item.createdon).format('h:mm:ss a')}
        </td>
        <td>
        {
          (item.status==='deactivate')?
          <Switch 
              style={{color:'grey'}}
              onChange={(e)=>activestatus(item.id,e)}
          />:
          <Switch  
              onChange={(e)=>deactivestatus(item.id,e)}
              defaultChecked/>
        }
        </td>
        <td><UilEdit style={{color:'green',}} onClick={()=>updateData(item.id, item.name)}/>
        </td>
        <td>
          
          <Button variant="primary" onClick={()=>setRole(item.id, item.role_id)}
          style={{marginLeft:'20px'}}
          >
          Assign Role
          </Button>
        
          <Button variant="danger" onClick={(e)=>aroles(item.id,e)}
            style={{marginLeft:'20px'}} 
          >
          View / Revoke
          </Button>

        </td>
       </tr>
        )
    })
}
        </tbody>
      </Table>
      </div>
    </div>

    {/* /////////// FOR UPDATE ///////////////// */}

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
      <Form.Label>User Id</Form.Label>
      <Form.Control value={neweid} onChange={(e)=>setNewEid(e.target.value)} disabled='true' /> <br />
      <Form.Label>User Name</Form.Label>
      <Form.Control value={newename} onChange={(e)=>setNewEname(e.target.value)} /> <br />
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>saveUpdatedData()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    {/* /////////// FOR ROLE ASSIGN ///////////////// */}

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
      <Form.Label>User Id</Form.Label>
      <Form.Control value={neweid} onChange={(e)=>setNewEid(e.target.value)} disabled='true' /> <br />
      <Form.Label>Roles</Form.Label>
         <Form.Select aria-label="Default select example"
          value={newRole} onChange={(e)=>setNewRole(e.target.value)}
         >
          {
    roleData.map((item,index) =>
    { 
        return(
            <option key={index}>
            <option
            >{item.role_id}
            </option>
            </option>
        )
    })
}
        </Form.Select>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>saveRole()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    {/* /////////// FOR VIEW AND REVOKE ///////////////// */}

    <Modal show={view} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Assigned Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
      <Form.Label>User Id</Form.Label>
      <Form.Control value={neweid} onChange={(e)=>setNewEid(e.target.value)} disabled='true' /> <br />
      <Form.Label>Roles</Form.Label>
          {
    roleAssign.map((item,index) =>
    { 
        return(
            <tr key={index}>
            <td
            >{item.role_id}
            &nbsp; &nbsp; ~  &nbsp; &nbsp; 
             {item.role_name}       
            </td>
            <td>
              <UilTimes className='cross-btn ink buzz-out-on-hover'
                          onClick={()=>deleteRole(item.id,item.role_id)}
            />
           </td>
            </tr>
        )
    })
}
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>saveRole()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default User