import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Footer from '../../components/footer';
import MoodPopup from '../../components/popupMoods';
import classnames from 'classnames';
import './index.scss'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moodPopupShow: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  popupMoods = () => {
    const { moodPopupShow } = this.state;
    this.setState({
      moodPopupShow: !moodPopupShow
    });
  }

  render () {
    const { moodPopupShow } = this.state;
    return (
      <View className={classnames('mood-container', { scale: moodPopupShow })}>
        <MoodPopup
          show={moodPopupShow}
        />
        <Footer
          popupMoods={this.popupMoods}
        />
      </View>
    )
  }
}
