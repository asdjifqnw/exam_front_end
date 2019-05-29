import axios from 'axios'
let base = "/api"
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data) }
export const addUser = params => { return axios.post(`${base}/admin/user`, params).then(res => res.data) }
export const modifyUserInfo = params => { return axios.patch(`${base}/admin/user/${params.id}`,params).then(res => res.data) }
export const getUsers = () => { return axios.get(`${base}/admin/users`).then(res => res.data) }
export const removeUser = params => { return axios.delete(`${base}/admin/user/${params}`).then(res => res.data) }