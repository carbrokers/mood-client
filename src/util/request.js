import Taro from '@tarojs/taro';
import config from '../config/config';

const request = (url, data, method = 'get') => {
  const { host, prefix } = config;
  const compelteUrl = `${host}${prefix}${url}`;
  console.log(compelteUrl);
  return new Promise((resolve, reject) => {
    Taro.request({
      url: compelteUrl,
      method,
      data,
      success(res) {
        resolve(res.data);
      },
    })
  })
}

export default request;