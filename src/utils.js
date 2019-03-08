const getGuid = () => {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) guid += '-'
  }
  return guid
}

const promisify = (api) => (options, ...params) => new Promise((resolve, reject) => {
  api(Object.assign({}, options, {success: resolve, fail: reject}), ...params)
})


// /* 获取当前页url */
// function getCurrentPageUrl() {
//   const pages = getCurrentPages() // 获取加载的页面
//   const currentPage = pages[pages.length - 1] // 获取当前页面的对象
//   const url = currentPage.route // 当前页面url
//   return url
// }

/* 获取当前页带参数的url */
function getCurrentPageUrlWithArgs() {
  const pages = getCurrentPages() // 获取加载的页面
  const currentPage = pages[pages.length - 1] // 获取当前页面的对象
  const url = currentPage.route // 当前页面url
  const options = currentPage.options // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  let urlWithArgs = url
  if (options) {
    urlWithArgs += '?'
    const keys = options.keys
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = options[key]
      urlWithArgs += key + '=' + value + '&'
    }
  }

  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

export {
  getGuid,
  promisify,
  getCurrentPageUrlWithArgs
}
