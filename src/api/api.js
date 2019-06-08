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
export const removeUserIvg = params => { return axios.delete(`${base}/admin/user_ivg/${params}`).then(res => res.data) }
export const setUserIvg = params => { return axios.post(`${base}/admin/user_ivg`,params).then(res => res.data) }
export const addTask = params => { return axios.post(`${base}/admin/task`,params).then(res => res.data) }
export const modifyTaskInfo = params => { return axios.patch(`${base}/admin/task/${params.id}`,params).then(res => res.data) }
export const getTasks = () => { return axios.get(`${base}/tasks`).then(res => res.data) }
export const removeTask = params => { return axios.delete(`${base}/admin/task/${params.id}`).then(res => res.data) }
export const closeTask = params => { return axios.get(`${base}/admin/task/${params.id}/close`).then(res => res.data) }