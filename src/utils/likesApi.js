import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postId) {
    return fetch(`${BASE_URL}posts/${postId}/likes`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json()
        throw new Error('Error creating a like, check server terminal')
    })
}

export function deleteLike(likeID) {
    return fetch(`${BASE_URL}likes/${likeID}`, { 
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
            
        }

    }).then((responseFromTheServer) => {
        if (responseFromTheServer.ok) return responseFromTheServer.json() 

        
        return responseFromTheServer.json().then(res => {
            throw new Error('Something went wrong in DELETE LIKE check terminal'); 
        })
    })
}