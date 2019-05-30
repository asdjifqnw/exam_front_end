import axios from 'axios'
let base = "/api"
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data) }
export const addUser = params => { return axios.post(`${base}/admin/user`, params).then(res => res.data) }
export const modifyUserInfo = params => { return axios.patch(`${base}/admin/user/${params.id}`, params).then(res => res.data) }
export const getUsers = () => { return axios.get(`${base}/admin/users`).then(res => res.data) }
export const removeUser = params => { return axios.delete(`${base}/admin/user/${params}`).then(res => res.data) }
export const addIvg = params => { return axios.post(`${base}/admin/ivg`, params).then(res => res.data) }
export const getIvgs = () => { return axios.get(`${base}/ivgs`).then(res => res.data) }
export const removeIvg = params => { return axios.delete(`${base}/admin/ivg/${params}`).then(res => res.data) }
export const modifyIvgInfo = params => { return axios.patch(`${base}/admin/ivg/${params.id}`, params).then(res => res.data) }
export const countIsSetIvg = params => { return axios.get(`${base}/admin/user_ivg/${params.id}/countIsSetIvgs`).then(res => res.data) }
export const findUserByIvgId = params => { return axios.get(`${base}/findUserByIvgId`, { params: { id: params } }).then(res => res.data) }