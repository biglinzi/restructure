/**
 * 获取根域名，如：knowlegene.com
 */
export function getDomain() {
  let domain =
    /[^.]+\.(com.cn|com|net.cn|net|org.cn|org|gov.cn|gov|cn|mobi|me|info|name|biz|cc|tv|asia|hk|网络|公司|中国)/i.exec(
      location.hostname
    )
  return domain ? domain[0] : '';
}
