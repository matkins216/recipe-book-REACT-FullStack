import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postId){
	return fetch(`${BASE_URL}posts/${postId}/likes`, {
		method: 'POST',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}
	}).then(res => {
		
		if(res.ok) return res.json()
		throw new Error('Error creating a like, check server terminal')
	})
}


export function deleteLike(likeId){
	return fetch(`${BASE_URL}likes/${likeId}`, {
		method: 'DELETE',
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		}	
	}).then(res => {
		
		if(res.ok) return res.json() 
		throw new Error('Error deleting a like, check the server terminal')
	})
}