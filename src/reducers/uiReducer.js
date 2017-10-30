const initialState = {
	isLoggedIn: false,
}

export default function uiReducer(state = initialState, action) {
	switch(action.type) {
		case 'TOGGLE_LOGIN':
			return Object.assign({}, state, {isLoggedIn: action.payload})
		default:
			return state
	}
}