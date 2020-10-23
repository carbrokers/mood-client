import React, { Component } from 'react'
import { View, Canvas } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss';

export default class MoodsPopup extends Component {
  render() {
    const { show } = this.props;
    return (
      <View className={classnames('mood-create-container', { show })}>
        <Canvas style='width: 100%; height: 300px;' canvasId='canvas'></Canvas>
      </View>
    );
  }
}