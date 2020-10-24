import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss';

const defOpt = {
  lineWidth: 2,
  lineNum: 90,
  padding: 14
};

const animation = Taro.createAnimation({
  delay: 0,
  timingFunction: 'ease'
});

var containerAnimation = Taro.createAnimation({
  timingFunction: 'ease',
  duration: 200
});

const device = wx.getSystemInfoSync();

export default class MoodsPopup extends Component {

  constructor(props) {
    super(props);
    this.ctx = null
    this.data = {
      width: 750,
      height: 400,
      colors: [{
        percent: 50,
        color: '#67C23A'
      }, {
        percent: 80,
        color: '#E6A23C'
      }, {
        percent: 100,
        color: '#F56C6C'
      }],
      max: 100,
      min: 0
    }
    this.state = {
      animationData: {}
    }
    this.emit = props.show;
  }

  componentDidMount() {
    this.ctx = Taro.createCanvasContext('dash-board');
    // this.drawDashBoard();
  }

  drawDashBoard() {
    const halfWidth = parseInt(Math.min(this.data.width, 750) / 750 * device.windowWidth / 2, 10);
    const lineLength = parseInt(this.data.width / 750 * device.windowWidth / 20, 10);
    this.ctx.lineWidth = Math.round(this.data.width / 750) + 1;

    for (let i = 0; i < defOpt.lineNum; i++) {
      const stepPercent = parseInt(i / defOpt.lineNum * 100, 10);
      this.ctx.strokeStyle = this.getCurrentColor(stepPercent);

      this.ctx.save();
      this.ctx.translate(halfWidth, halfWidth);
      this.ctx.rotate(parseInt((180 / defOpt.lineNum * i - 90), 10) * Math.PI / 180);

      this.ctx.beginPath();
      this.ctx.moveTo(0, defOpt.padding - halfWidth);
      this.ctx.lineTo(0, defOpt.padding - halfWidth + lineLength);
      this.ctx.stroke();
      this.ctx.restore();
    }

    return this.ctx.draw();
  }

  drawPage(val) {
    const percent = parseInt((val - this.data.min) / (this.data.max - this.data.min) * 100, 10);
    const deg = 180 * (percent / 100) - 90;
    animation.rotate(deg).step();
    this.setState({
      animationData: animation.export()
    });
  }

  getCurrentColor(percent) {
    const stepPercent = Math.min(percent || 0, 100);
    let result;
    for (let ci = 0; ci < this.data.colors.length; ci++) {
      const colorObj = this.data.colors[ci];
      if (stepPercent < colorObj.percent) {
        result = colorObj.color;
        break;
      }
    }
    return result;
  }

  getPos = (e) => {
    const { pageX, pageY } = e.touches[0];
    const width = pageX - device.windowWidth / 2;
    const height = device.windowHeight - pageY;
    const deg = (1 - Math.atan2(height, width) / Math.PI) * 100;
    // console.log(deg);
    this.drawPage(deg)
  }

  render() {
    const { show } = this.props;
    const { animationData } = this.state;
    const top = (this.data.height - this.data.width / 750 * 400) / 2;
    const now = Date.now();
    if (this.emit === false && show) {
      setTimeout(() => {
        this.drawDashBoard()
      }, 400);
    }
    return (
      <View className={classnames('mood-create-container', { show })}>
        <View className="mood-panel" onTouchMove={this.getPos}>
          <Canvas className="mood-canvas" style={`width: ${this.data.width}rpx;height: ${this.data.height}rpx; top: ${top}rpx`} canvasId='dash-board' className="dashboard"></Canvas>
          <View className="_pointer"
            animation={animationData}
            style={`width: ${this.data.width}rpx; height: ${this.data.width}rpx; top: ${top}rpx`}
          >
          </View>
        </View>
      </View>
    );
  }
}
