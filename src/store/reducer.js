import ACTION_TYPES from "./actionTypes";


const initialState = {
    products: [],
};

export default (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.ADD_PRODUCT: {
            return {
                ...state,
                products: payload,
            };
        }


        default:
            return state;
    }
};
