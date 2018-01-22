import request from '@/utils/request'
import MemberModel from '@/models/MemberModel'

/** 获取会员列表 */
export function getMemberList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/member/member-list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new MemberModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加会员
 * @param params
 * @returns {Promise<any>}
 */
export function addMember(params) {
  const _params = {
    uname: params.uname,
    password: params.password,
    name: params.nickname,
    sex: params.sex,
    mybirthday: params.birthday,
    email: params.email,
    tel: params.tel,
    mobile: params.mobile,
    province: params.province,
    province_id: params.province_id,
    city: params.city,
    city_id: params.city_id,
    region: params.region,
    region_id: params.region_id,
    town: params.town,
    town_id: params.town_id,
    zip: params.zip,
    address: params.address
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/member/save-member.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除会员
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteMembers(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('member_id', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/member/delete.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
