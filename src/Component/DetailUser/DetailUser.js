import React, { Component } from 'react'
import './DetailUser.css'
import { withRouter } from '../Login/withRouter'


class DetailUser extends Component {
    render() {

        const handleLgOut = () => {
            localStorage.clear()
            this.props.navigate('/Main')
        }

        return (
            <div className='user-detail'>
                <div className='bhd-page-user-detail'>
                    <div className='info-user-detail'>

                        <div className='member--edit'>
                            <div className='member--info'>
                                <a className='avatar'>
                                    <img alt='' src={require('./ImageDetailUser/avatar.png')} />
                                </a>
                                <h4 className='title'>{localStorage.getItem('email')}</h4>
                                <ul className='meta'>
                                    <li>
                                        <strong>Tổng visit: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Active visit: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Expried visit: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                </ul>
                                <ul className='meta'>
                                    <li>
                                        <strong>Điểm thưởng: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Tổng chi tiêu trong tháng: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Expried visit: </strong>
                                        <strong className='point'>0</strong>
                                        <sup>đ</sup>
                                    </li>
                                </ul>
                            </div>
                            <form className='form--inside'>
                                <label className='controls'>
                                    <span className='txt--label'>Email</span>
                                    <input type='email' className='inp--text' value={localStorage.getItem('email')} />
                                </label>

                                <label className='controls'>
                                    <span className='txt--label'>Họ (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Tên (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Số điện thoại (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Giới tính (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Địa chỉ</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Thành phố</span>
                                    <input type='email' className='inp--text' />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className='cardinfo-user-detail'>
                        <div className='member-card'>
                            <h3>Thông tin vé</h3>
                            <ul>
                                <li>Phim: {localStorage.getItem('filmName')}</li>
                                <li>Suất chiếu:
                                    <span className='no'>{localStorage.getItem('time')}</span>
                                </li>
                                <li>Số vé: {localStorage.getItem('countTicket')}</li>
                                <li>Số ghế: {localStorage.getItem('seats')}</li>
                                <li>Rạp:
                                    <span className='lv'>{localStorage.getItem('cinName')}</span>
                                </li>
                                <li>Địa chỉ: {localStorage.getItem('cinAdd')}</li>
                            </ul>
                        </div>
                        <div className='sign-out-cover'>
                            <button className='sign-out' onClick={handleLgOut}>ĐĂNG XUẤT</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter (DetailUser)