import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, Paper, Button } from '@mui/material';




export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dob, setDOB] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [accounts, setAccounts] = React.useState([]);
  const handleClick = (e) => {
    e.preventDefault()
    const account = { username, password, dob, address }
    console.log(account)
    fetch("http://localhost:8080/account/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account)

    }).then(() => {
      console.log("New Account added")
    })
  }

  React.useEffect(() => {
    fetch("http://localhost:8080/account/getAll")
      .then(res => res.json())
      .then((result) => {
        setAccounts(result);
      }
      )
  }, [])

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Add Student</u></h1>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <TextField
              label="Username"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-DOB"
                aria-describedby="outlined-DOB-helper-text"
                inputProps={{
                  'aria-label': 'DOB',
                }}
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
              <FormHelperText id="outlined-weight-helper-text">DOB</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>


            <Button variant="contained" color="success" onClick={handleClick}>
              Submit
            </Button>

          </div>
        </Box>
      </Paper>
      <h1>Account</h1>

      <Paper elevation={3} style={paperStyle}>

        {accounts.map(account => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={account.userId}>
            Id:{account.userId}<br />
            Name:{account.username}<br />
            Password:{account.password}<br />
            Address:{account.address}<br />
            DOB:{account.dob}<br />

          </Paper>
        ))

        }
      </Paper>
    </Container>


  );
}
