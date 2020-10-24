import { Component } from 'react'
import request from './util/request'
import './app.scss'

class App extends Component {

  async onLaunch() {
    // let token = wx.getStorageSync('token');
    // if (token) {
    //   return;
    // }
    // const { code } = await wx.login();
    // const result = await request('/token', {
    //   code,
    //   type: 200
    // }, 'post');
    // wx.setStorageSync('token', result.token);
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
