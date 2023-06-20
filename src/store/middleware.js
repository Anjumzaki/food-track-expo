
import actions from "./actions"
import store from "./index";



const _addProduct = body => (dispatch) => {
    dispatch(actions._setProduct(body))
}

export default {
    ...actions,
    _addProduct,

}
