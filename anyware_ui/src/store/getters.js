export default {
  getSpaces: state => { return state.spaces },
  getUser: (state) => state.user,
  getContainers: (state) => state.containers,
  getWarehouses: (state) => state.warehouses,
  getAllWarehouses: (state) => state.allWarehouses
}
