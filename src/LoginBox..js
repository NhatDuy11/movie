import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './App.css'
import { connect } from 'react-redux';


class LoginBox extends Component {
  constructor() {
    super()
    this.state = {
      userEmail: localStorage.getItem("email"),
      user: {
        email: "",
        password: ""
      },
      errMess: "",
      showPass: false
    }
  }


  render() {

    const handleInput = (event) => {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value,
        }
      })
      console.log(this.state.user);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (Object.values(this.state.user).filter(n => n == "").length === 0) {

        fetch("http://localhost:3003/user/login",
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state.user)
          })
          .then(res => {
            if (res.status == 200) {
              this.setState({
                errMess: "Đăng nhập thành công",
                user: {
                  email: localStorage.setItem("email", this.state.user.email),
                }
              })
              window.location.href = '/'
              this.props.GetUser(
                this.state.user.email
              )
            } else {
              this.setState({
                errMess: "Email hoặc password không đúng"
              })
            }
          })
        console.log(this.state.user);
      }
      else {
        this.setState({
          errMess: "Vui lòng nhập đầy đủ"
        })
      }
    }

    const handleLgOut = () => {
      localStorage.clear()
    }

    const handleShowPass = (e) => {
      e.preventDefault();
      this.setState({
        showPass: !this.state.showPass
      })
    }

    return (
      this.state.userEmail === null ?
        <form className='bhd-form-login-top'>
          {Object.keys(this.state.user).map((n, i) => {
            return (
              <div className='controls' key={i}>
                <label>{n}*</label>
                {n === 'password' ?
                  <input className='user_login_email' type={this.state.showPass ? "text" : "password"} value={this.state.user[n]} onChange={handleInput} name={n} />
                  :
                  <input className='user_login_email' type='text' value={this.state.user[n]} onChange={handleInput} name={n} />
                }
              </div>
            )
          })}
          <div className='btn-show-pass'>
            <button className='show-pass' onClick={handleShowPass}>Show Password</button>
          </div>
          <div className='controls--submit'>
            <button type='submit' className='login-submit' onClick={handleSubmit}>ĐĂNG NHẬP</button>
          </div>
          <Link className='bhd-dang-ky' to='/Register'>Đăng ký thành viên</Link>
        </form>
        :
        <button className='log-out' onClick={handleLgOut}>ĐĂNG XUẤT</button>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.allInfo
  }
}



export default connect(mapStateToProps, null)(LoginBox)


