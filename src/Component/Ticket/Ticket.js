import React from 'react';
import Slider from 'react-slick';
import './Ticket.css';
import { connect } from 'react-redux';
import { useState } from 'react'
import { Component } from 'react'
import Cinema from '../Cinema/Cinema';
import {
  Link
} from "react-router-dom";

class Ticket extends Component {
  constructor (){
    super () 
    this.state = {
      ApiFilmId: [],
      Title: [],
      GraphicUrl: []
    }
  }
  componentDidMount() {
    this.props.getFilms()
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      speed: 1000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };

    const getMovieDetail = (ApiFilmId, Title, GraphicUrl) => {
      this.props.GetMovieDetail(ApiFilmId)
      this.setState({
        ApiFilmId: localStorage.setItem('ApiFilmId', ApiFilmId),
        Title: localStorage.setItem("filmName", Title),
        GraphicUrl: localStorage.setItem("GraphicUrl", GraphicUrl)
      })
    }

    // function Ticket(props) {
    //   const settings = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     speed: 1000,
    //     autoplaySpeed: 2000,
    //     cssEase: "linear",
    //   };


    return (
      <div className='ticket'>
        <div className='section--product-view'>
          <ul className='film_list'>
            <li className='film_title' >
              <a href='/Ticket'>LỊCH CHIẾU THEO PHIM </a>
            </li>
            <span>|</span>
            <li className='list_cin'>
              <Link to='/Cinema'>LỊCH CHIẾU THEO RẠP</Link>
            </li>
          </ul>
          <Slider {...settings} style={{ width: '1200px', margin: 'auto' }}>
            {this.props.uRdc.listFilm.length &&
              console.log(this.props.uRdc.listFilm)}
            {this.props.uRdc.listFilm.map((n, i) => {
              return <div className='slider--film--main' key={i} >
                <img alt='' src={n.GraphicUrl} />
                <span className='movie--name'>{n.Title}</span>
                <div className='btn--green'>
                  <a className='fa-ticket' onClick={()=>{getMovieDetail(n.ApiFilmId, n.Title, n.GraphicUrl)}} ><Link to ='/DetailMovie'>MUA VÉ</Link></a>
                </div>
              </div>
            })}
          </Slider>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState, ownProps) => {
  return {
    uRdc: reduxState.filmsNow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFilms: (val) => {
      dispatch({ type: "getFilms", payload: val })
    },
    GetMovieDetail: (ApiFilmId) => {
      console.log(ApiFilmId);
      dispatch({ type: "GetDetailMovie", payload: {ApiFilmId: ApiFilmId} })
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)
