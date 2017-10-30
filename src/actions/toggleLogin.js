export default function toggleLogin(bool) {
	return {
		type: 'TOGGLE_LOGIN',
		payload: bool
	}
}