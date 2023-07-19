export const addToCart = (data) => {

    console.warn("action called ", data)
    return {
        type: "Add_TO_CART",
        // data:data
        data
    }
}

