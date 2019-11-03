import Api from '@/services/Api'
/*eslint-disable no-console*/

export default {
  getContainers(email) {
    let url = `container/${email}`
    return Api().get(url)
  },
  updateContainer(container) {
    let url = `container/${encodeURIComponent(JSON.stringify(container))}`
    console.log(url)
    return Api().put(url)
  },
  createContainer(container, email) {
    let param = [email, container]
    let url = `container/${encodeURIComponent(JSON.stringify(param))}`
    return Api().post(url)
  },
  deleteContainer(cid) {
    let url = `container/${cid}`
    return Api().delete(url)
  }
}