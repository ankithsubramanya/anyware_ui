import storageService from '../services/StorageService'
import authService from '../services/AuthService'
import containerService from '../services/ContainerService'
import warehouseService from '../services/WarehouseService'

let sub = function(a1, a2) {
  a1.map(function(a, i, arr) {
    arr[i] -= a2[i]
  })
  return a1
}

let div = function(a1, a2) {
  a1.map(function(a, i, arr) {
    arr[i] /= a2[i]
  })
  return a1
}

let cross = function(a1) {
  let res = Array.from(a1)
  let len = a1.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      // console.log(`${a1[i]}, ${a1[j]} returning ${a1[i]*a1[j]}`)
      if (j >= i) {
      //   console.log("i ",a1[i])
      // console.log("j ",a1[j])
      // console.log("ij ",a1[i]*a1[j])
      
      res.push(a1[i] * a1[j])
      }
      
    }
  }
  return res
}

// const mult = function(a1, a2) {
//   let res = a1.map(function(a, i) {
//     a *= a2[i]
//   })
//   return res
// }

// const add = function(a1, a2) {
//   let res = a1.map(function(a, i) {
//     a += a2[i]
//   })
//   return res
// }

let norm = function(a1) {
  // let res = 0
  let res = a1.reduce((r, a) => {
    let aa = a * a
    if (aa > 1e+7) aa = 1
    r = r + (aa)
    // console.log("acc ", r)
    return r
  }, 0)
  // res = Math.sqrt(res)
  // console.log("normed ", res)
  return res
}

/*eslint-disable no-console*/
export default {
  // 
  // --- MODEL ACTIONS ---
  // 
  fitModel: function(context, x) {
    x = cross(x)
    for (let i = 0; i < x.length; i++) console.log(x[i])
    console.log("post cross ")
    console.log(x)
    let y = x.slice(0, 16)
    console.log(y)
    let model = context.state.model
    console.log(model)

    x = sub(y, model.mean)
    console.log("post mean norm ", x)
    x = div(x, model.std)
    console.log("post std norm ", x)

    let res = 0
    for (let i = 0; i< model.mu.length; i++) {
      let dist = norm(sub(x, model.mu[i]))
      console.log("dist", -model.lambda[i][0]*dist)
      console.log("exp", Math.exp(-model.lambda[i][0]*dist))
      res += model.w[i] * Math.exp(-model.lambda[i][0] * dist)
      // console.log("res ", res)
    } 
    return res

    // return 5e-6 * x[0] * x[1] + ((1000*x[3]*x[3]) + (1000*x[4]*x[4]))
  },
  // 
  // ---SPACE ACTIONS---
  // 
  getSpaces: function (context) {
    storageService.getSpaces().then((res) => {
      console.log("Spaces requested, found ", res)
      context.commit("setSpaces", res.data)
    })
  },
  getSpacesByCity: function(context, props) {
    console.log("Spaces by city requested, found  ", props)
    storageService.getByCity(props).then((res) => {
      // console.log("Action commited, found ", res)
      context.commit("setSpaces", res.data).then(() => {return})
    })
  },
  deleteSpace: function(context, props) {
    console.log("Deleting space ", props)
    storageService.deleteSpace(props).then(() => {
      context.dispatch("getSpaces")
    })
  },
  addSpace: function(context, props) {
    console.log("inserting space ", props)
    storageService.insertSpace(props).then(() => {
      context.dispatch("getSpaces")
    })
  },
  updateSpace: function(context, props) {
    console.log("updating space ", props)
    storageService.updateSpace(props).then(() => {
      context.dispatch("getSpaces")
    })
  },
  getPixels: function(context, wid) {
    console.log("getting pixels...")
    storageService.getPixelsbyWarehouse(context, wid).then((res) => {
      return res
    })
  },
  reserveSpace: function(context, props) {
    console.log("reserving ", props)
    storageService.reserveSpace(props.idspace, props.idcontainer).then(() => {
      context.dispatch("getSpaces").then(() => {
        context.dispatch("fetchContainers").then(()=>{return})
      })
    })
  },
  unreserveSpace: function(context, props) {
    console.log("unreserving ", props)
    storageService.unreserveSpace(props.idspace, props.idcontainer).then(() => {
      context.dispatch("fetchContainers").then(() => {
        context.dispatch("getSpaces").then(()=> {return})
      })
    })
  },
  // 
  // --- USER ACTIONS ---
  // 
  validateUser: function(context, email) {
    console.log("Validating user: ", email)
    //   TODO connect to storageService.
    authService.authenticate(email).then((res) => {
      console.log("Validate returned: ", res)
      if (res == []) { //failure.
        return false
      } else { // success.
        context.commit("setUser", res.data[0])
        return true
      }
    })
  },
  deleteUser: function(context, email) {
    console.log("deleting user: ", email)
    //   TODO connect to storageService.
    authService.deleteUser(email).then(() => {
        context.dispatch("signOut")
        // return true
    })
  },
  updateUser: function(context, user) {
    console.log("Updating user: ", user)
    authService.updateUser(user).then((res) => {
      console.log("Update returned: ", res)
      if (res == []) { //failure.
        return false
      } else { // success.
        context.commit("setUser", user)
        return true
      }
    })
  },
  createUser: function(context, user) {
    console.log("Creating user: ", user)
    authService.createUser(user).then((res) => {
      console.log("Create returned: ", res)
      if (res == []) { // failure.
        return false
      } else { // success.
        context.commit("setUser", user)
        return true
      }
    })
  },
  signOut: function(context) {
    console.log("signing out...")
    context.commit("setUser", {})
  },
  // 
  // ---CONTAINER ACTIONS ---
  // 
  fetchContainers: function(context) {
    let id = context.state.user.email
    console.log('getting containers for ', id)
    containerService.getContainers(id).then((res) => {
      context.commit('setContainers', res.data)
      console.log('returned', res.data)
    })
  },
  updateContainer: function(context, container) {
    // let id = context.state.user.email
    console.log('Updating container ', container)
    containerService.updateContainer(container).then((res) => {
      console.log('returned', res)
      context.dispatch('fetchContainers')
    })
  },
  createContainer: function(context, container) {
    let id = context.state.user.email
    console.log('Creating container ', container)
    containerService.createContainer(container, id).then((res) => {
      console.log('returned', res)
      context.dispatch('fetchContainers')
    })
  },
  deleteContainer: function(context, container) {
    // let id = context.state.user.email
    console.log('Deleting container ', container)
    containerService.deleteContainer(container).then((res) => {
      console.log('returned', res)
      context.dispatch('fetchContainers')
    })
  },
  // 
  // ---WAREHOUSE ACTIONS ---
  // 
  fetchWarehouses: function(context) {
    let id = context.state.user.email
    console.log('getting warehouses for ', id)
    warehouseService.getWarehouses(id).then((res) => {
      console.log('returned', res)
      context.commit('setWarehouses', res.data)
    })
  },
  fetchAllWarehouses: function(context) {
    console.log('getting all warehouses ')
    warehouseService.getAllWarehouses().then((res) => {
      console.log('returned all', res.data)
      context.commit('setAllWarehouses', res.data)
    })
  },
  updateWarehouse: function(context, warehouse) {
    // let id = context.state.user.email
    console.log('Updating warehouse ', warehouse)
    warehouseService.updateWarehouse(warehouse).then((res) => {
      console.log('returned', res)
      context.dispatch('fetchWarehouses')
    })
  },
  createWarehouse: function(context, warehouse) {
    let id = context.state.user.email
    console.log('Creating warehouse ', warehouse, id)
    warehouseService.createWarehouse(warehouse, id).then((res) => {
      console.log('returned from w_create', res.data)
      context.dispatch("getVisual", warehouse).then((res) => {
        console.log("got spaces: ", res.data)
      })

      context.dispatch('fetchWarehouses')
    })
  },
  deleteWarehouse: function(context, warehouse) {
    // let id = context.state.user.email
    console.log('Deleting warehouse ', warehouse)
    warehouseService.deleteWarehouse(warehouse).then((res) => {
      console.log('returned', res)
      context.dispatch('fetchWarehouses')
    })
  },
  getVisual: function(context, warehouse) {
    console.log("viz for ", warehouse)
    warehouseService.getViz(warehouse).then((res) => {
      console.log("returned ", res.data)
      return res.data
    })
  }
}