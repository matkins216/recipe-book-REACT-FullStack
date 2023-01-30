import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postId) {
    return fetch(`${BASE_URL}posts/${postId}/likes`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
            //this is how we grab the token from local storage
        }
    }).then(res => {
        if (res.ok) return res.json()
        throw new Error('Error creating a like, check server terminal')
    })
}

export function deleteLike(likeID) {
    return fetch(`${BASE_URL}likes/${likeID}`, { // since this is sending a photo (form data) no need to do JSON things
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
            //this is how we grab the token from local storage
        }

    }).then((responseFromTheServer) => {
        if (responseFromTheServer.ok) return responseFromTheServer.json() // return if everything okay

        // this is the return if there was an error from the server
        return responseFromTheServer.json().then(res => {
            throw new Error('Something went wrong in DELETE LIKE check terminal'); // < this goes to the catch block
            // when you call the create function (in handleAddPost in the feed page)
        })
    })
}