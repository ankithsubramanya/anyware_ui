import Api from '@/services/Api'
/*eslint-disable no-console*/

export default {
  getWarehouses(email) {
    let url = `warehouse/email/${email}`
    return Api().get(url)
  },
  getAllWarehouses() {
    let url = `warehouse/all-warehouses`
    console.log("getting ", url)
    return Api().get(url)
  },
  updateWarehouse(warehouse) {
    let url = `warehouse/${encodeURIComponent(JSON.stringify(warehouse))}`
    console.log(url)
    return Api().put(url)
  },
  createWarehouse(warehouse, email) {
    let param = [email, warehouse]
    let url = `warehouse/${encodeURIComponent(JSON.stringify(param))}`
    return Api().post(url)
  },
  deleteWarehouse(wid) {
    let url = `warehouse/${wid}`
    return Api().delete(url)
  },
  getViz(warehouse) {
    let url=`warehouse/optimal-arrangement/${warehouse.width_feet}/${warehouse.length_feet}/${warehouse.idwarehouse}`
    // let url=`warehouse/optimal-arrangement/${500}/${500}/${warehouse.idwarehouse}`
    console.log(url)
    return Api().get(url)
  }
}