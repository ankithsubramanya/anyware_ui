
import Api from '@/services/Api'
/*eslint-disable no-console*/

export default {
  authenticate(email) {
    let url = `user/${email}`
    return Api().get(url)
  },
  updateUser(user) {
    let arr = [user]
    let url = `user/${encodeURIComponent(JSON.stringify(arr))}`
    console.log(url)
    return Api().put(url)
  },
  createUser(user) {
    let arr = [user]
    let url = `user/${encodeURIComponent(JSON.stringify(arr))}`
    return Api().post(url)
  },
  deleteUser(email) {
    let url = `user/${email}`
    return Api().get(url)
  }
}