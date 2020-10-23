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
  delay: 200,
  timingFunction: 'ease'
});
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
  }

  componentDidMount() {
    this.ctx = Taro.createCanvasContext('dash-board');
    this.drawDashBoard();
    setTimeout(() => {
      this.drawPage(50)
    }, 1000);
  }

  drawDashBoard() {
    const device = wx.getSystemInfoSync();
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
    console.log(animation.export())

    this.setState({
      currentColor: this.getCurrentColor(percent),
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

  render() {
    const { show } = this.props;
    return (
      <View className={classnames('mood-create-container', { show })}>
        <View className="_pointer"
          animation={this.state.animationData}
        >

        </View>
        <Canvas style='width: 100%; height: 400px;' canvasId='dash-board' className="dashboard"></Canvas>
      </View>
    );
  }
}

// style="width:{{width}}rpx;height:{{width}}rpx;top:{{(height - width / 750 * 400) / 2}}rpx"