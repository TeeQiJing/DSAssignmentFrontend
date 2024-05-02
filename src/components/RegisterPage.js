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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield/dist/CurrencyTextField';
// import { NumericFormat, NumericFormatProps } from "react-number-format";
// import PropTypes from 'prop-types';
// import { Input as BaseInput } from '@mui/base/Input';
// import { styled } from '@mui/system';




export default function RegisterPage() {
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const NumericFormatCustom = React.forwardRef(
  //   function NumericFormatCustom(props, ref) {
  //     const { onChange, ...other } = props;
  
  //     return (
  //       <NumericFormat
  //         {...other}
  //         getInputRef={ref}
  //         onValueChange={(values) => {
  //           onChange({
  //             target: {
  //               name: props.name,
  //               value: values.value,
                
  //             },
              
              
  //           }
  //           ,setBalance(values.value)
  //         );
  //         }}
  //         thousandSeparator
  //         valueIsNumericString
  //         prefix="RM"
  //       />
  //     );
  //   },
  // );
  
  // NumericFormatCustom.propTypes = {
  //   name: PropTypes.string.isRequired,
  //   onChange: PropTypes.func.isRequired,
  // };
  const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dob, setDOB] = React.useState(null);
  const [balance, setBalance] = React.useState();
  const [mobile, setMobile] = React.useState('');
  const [secure_phrase, setSecure_phrase] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [accounts, setAccounts] = React.useState([]);
  const [account_number, setAccount_number] = React.useState();
  const [errormsg, setErrorMsg] = React.useState(false);



  const handleClick = (e) => {
    e.preventDefault()
    const account = { account_number, username, password, dob, address, balance, mobile, secure_phrase, email}
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
    fetch("http://localhost:8080/account/all")
      .then(res => res.json())
      .then((result) => {
        setAccounts(result);
      }
      )
  }, [])

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" , textAlign:"center"}}><u>Account Registration</u></h1>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Account Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Account Number"
                variant="outlined"
                value={account_number}
                onChange={(e) => setAccount_number(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>



          <FormControl sx={{ m: 1}} variant="outlined" fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']} >
              <DatePicker label="Date of Birth" 
              value={dob}
              onChange={(date) => {
                setDOB(date);
              }}
              
              renderInput={(props) => <TextField {...props} fullWidth
               sx={{width: '100%'}} />}
              />
            </DemoContainer>
          </LocalizationProvider>
          </FormControl>
          



            <FormControl sx={{ m: 1}} variant="outlined" fullWidth>
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
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Mobile</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              {/* <TextField
                label="Balance"
                value={values.numberformat}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
                variant="standard"
              /> */}
              {/* <InputLabel htmlFor="outlined-adornment-amount">Balance</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Balance"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              /> */}
               <CurrencyTextField
              label="Balance"
              variant="outlined"
              value={balance}
              currencySymbol="$"
              // minimumValue={3000}
              outputFormat="number"
              decimalCharacter="."
              placeholder="Currency"
              error={errormsg}
              helperText='Minimum amount of balance is 3000'
              
              digitGroupSeparator=","
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
              onChange={(event, newBalance)=> {setBalance(newBalance); if(event.target.value < 3000) setErrorMsg(true); else setErrorMsg(false)}}
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
            Account Number : {account.account_number}<br />
            Username : {account.username}<br />
            Password : {account.password}<br />
            Address : {account.address}<br />
            DOB : {account.dob}<br />
            Mobile : {account.mobile}<br />
            Secure Phrase : {account.secure_phrase}<br />
            Transaction Limit Per day : {account.trans_limit}<br />
            Account Type : {account.account_type}<br />
            Interest Rate p.a. : {account.interest_rate}<br />
            Balanace : RM{account.balance}<br />
            Email : {account.email}<br />

          </Paper>
        ))

        }
      </Paper>
    </Container>


  );
}
