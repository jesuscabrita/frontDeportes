export const ReducerApp = (state, action) => {
    switch (action?.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action?.payload,
            };
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                loginError: action?.payload,
            };
        default:
            return state;
    }
};