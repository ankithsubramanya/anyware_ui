
import Api from '@/services/Api'
/*eslint-disable no-console*/

export default {
  getSpaces () {
    return Api().get('space/all-spaces')
  },
  getByCity(cityName) {
    cityName = cityName.toLowerCase()
    let url = `space/city-listings/${cityName}`
    return Api().get(url)
  },
  deleteSpace(idspace) {
    let url = `space/delete-space/${idspace}`
    console.log("accessing url: ", url)
    return Api().delete(url)
  },
  insertSpace(space) {
    let obj_string = `[${JSON.stringify(space)}]`
    let url = `space/insert-space/${obj_string}`
    console.log("accesssing url: ", url)
    return Api().post(url)
  },
  updateSpace(space) {
    let obj_string = `[${JSON.stringify(space)}]`
    let url = `space/update-space/${obj_string}`
    console.log("accesssing url: ", url)
    return Api().put(url)
  },
  getPixelsbyWarehouse(wid) {
    let url = `space/spaces-by-warehouse/${wid}`
    console.log("accesssing url: ", url)
    return Api().get(url)
  },
  reserveSpace(idspace, idcontainer) {
    let url = `space/reserve-space/${idspace}/${idcontainer}`
    console.log("accessing url: ", url)
    return Api().put(url)
  },
  unreserveSpace(idspace, idcontainer) {
    let url = `space/unreserve-space/${idspace}/${idcontainer}`
    console.log("accessing url: ", url)
    return Api().put(url)
  }
}