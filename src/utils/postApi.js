// house all the fetch functions for crud updates on the POST resource
import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';

export function create(data){
	return fetch(BASE_URL, { 
		method: 'POST',
		body: data,
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}

	}).then((responseFromTheServer) =>{
		if(responseFromTheServer.ok) return responseFromTheServer.json() 

		return responseFromTheServer.json().then(res => {
			console.log(res, ' <- this is the response in Posts create function in your utils folder')
			throw new Error('Something went wrong in create Post'); 
		})
	})
}


export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }