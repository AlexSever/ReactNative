export default (state = null, action) => {
    switch (action.type) {
        case 'SELECT_LIBRARY':
            let final;
            state === action.payload ? final = null : final = action.payload;
            return final;
        default:
            return state;
    }
};