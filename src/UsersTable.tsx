import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import React, { Component } from 'react';

interface IState { data: {}[]; }
let name = '';
let email = '';
let web = '';
let location = '';

class UsersTable extends Component {
  /* States */
  state: IState = { data: [] }
  userState = {Name: '', Email: '', Web: '', Location: '' }

  fetchData = () => {
    /* Axios */
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users: any[] = response.data;
        const modUsers = users.map((user: any) => {
          return { Name: user.name, Email: user.email, Web: user.website, Location: user.address.city }
        });
        this.setState({ data: modUsers });

      })
      .catch(function (error) { console.log(error) })
  }

  componentDidMount() {
    this.fetchData();
  }


  deleteHandlder = (index: any) => {
    const newUser: {}[] = [...this.state.data];
    newUser.splice(index, 1);
    this.setState({ data: newUser });
  };

  readHandler = (user: any) => {
    alert(`${JSON.stringify(this.state.data[user])}`);
  }

  editHandler = () => {

  }

  nameHandlder = (event: any) => {
    if (event.key === `Tab`){
      name = event.target.value;
    }
  }

  emailHandlder = (event: any) => {
    if (event.key === `Tab`){
      email = event.target.value;
    }
  }

  webHandlder = (event: any) => {
    if (event.key === `Tab`){
      web = event.target.value;
    }
  }

  locationHandlder = (event: any) => {
    if (event.key === `Tab`){
      location = event.target.value;
    }
  }

  handleAdd = () => {
    const newUser = {Name: name, Email: email, Web: web, Location: location}
    const newUsers: {}[] = [...this.state.data, newUser];
    this.setState({ data: newUsers }); 

  }

  render() {
    /* console.log(this.state.data); */
    return (
      <div>
        <form noValidate autoComplete="off">
          <TextField required style={{margin: '10px' }} id="standard-basic" label="Name" onKeyDown = {this.nameHandlder}></TextField>
          <TextField required style={{margin: '10px' }} id="standard-basic" label="Email" onKeyDown = {this.emailHandlder}/>
          <TextField required style={{margin: '10px' }} id="standard-basic" label="Web" onKeyDown = {this.webHandlder}/>
          <TextField required style={{margin: '10px' }} id="standard-basic" label="Location" onKeyDown = {this.locationHandlder}/>
          <Button style={{margin: '23px' }} variant="contained" color="primary" onClick = {this.handleAdd}>Add User</Button>
        </form>
        <Divider></Divider>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Web</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data?.map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {
                      Object.values<string>(row).map((value, index) => {
                        return (
                          index === 0 ? <TableCell key={index}>{value}</TableCell> : <TableCell key={index} align="right">{value}</TableCell>
                        );
                      })
                    }
                    <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => { this.readHandler(index); }}><VisibilityIcon /></IconButton>
                      <IconButton onClick={() => { this.deleteHandlder(index); }}><DeleteIcon /></IconButton>
                      <IconButton><CreateIcon /></IconButton>
                    </TableCell>
                  </TableRow>

                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default UsersTable;

