import toggleLogin from './toggleLogin'

export default function me() {
	return dispatch => {
    var requestParams = {
      method: 'GET', 
      headers: {
        'content-type' : 'application/json',
        'token': localStorage.getItem('token')
      }
    }

    return fetch('https:\//the-fake-lobby-api.herokuapp.com/api/v1/refreshMe/', requestParams)
    .catch(error => console.log("could not login", error))
    .then(res => res.json())
    .then(json => {
      if (json.token) {
        localStorage.setItem('token', json.token)
        this.props.toggleLogin(true)
      }
    })
	}
}