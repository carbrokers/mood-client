import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames';
import "taro-ui/dist/style/components/flex.scss"
import './index.scss';

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    }
  }

  openModal = () => {
    const { modalShow } = this.state;
    this.setState({
      modalShow: !modalShow
    });
  }

  callMoodsPopup = () => {
    this.openModal();
    this.props.popupMoods();
  }

  render() {
    const { modalShow } = this.state;
    return (
      <View className="foot-container">
        <View className="modal-view" style={{display: modalShow ? 'block' : 'none'}} onClick={this.openModal}></View>
        <View className="at-row menu">
          <View className='at-col menu-item'>日历</View>
          <View className='at-col menu-item'>搜索</View>
        </View>
        <View  className={classnames("create-mood", {show: modalShow})}>
          <View className="action-log">
            <View className="action-text">记录</View>
          </View>
          <View className="action-mood" onClick={this.callMoodsPopup}>
            <View className="action-text" >心情</View>
          </View>
          <View className="action-fuck">
            <View className="action-text">联系</View>
          </View>
          <View className="start" onClick={this.openModal}>+</View>
        </View>
      </View>
    )
  }
}