import PageHeader from "../../components/PageHeader/PageHeader";


import Loader from "../../components/Loader/Loader";

import { useState, useEffect } from "react";

// import { create } from '../../utils/postApi'
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";




export default function DiscoverPage({handleLogout, loggedUser}) {

const [giphy, setGiphy] = useState('');
const [gif, setGif] = useState('chicken noodle soup')

useEffect(() => {
    const tastyUrl = ` https://api.spoonacular.com/recipes/random?apiKey=01503801ca734bf0af8dca9c1094e03f&number=25`;

    

    async function makeApiCall() {
        try {
            const responseJson = await fetch(tastyUrl)
            console.log(responseJson)
            const data = await responseJson.json()
            console.log(data, "___________________________")
            setGiphy(data.data)
        } catch (err) {
            console.log(err)
        }

    }
    makeApiCall();
}, [gif]);

// function liftGif(gif) {
//     console.log(gif);
//     setGif(gif);
// }

return (
    <>
        <PageHeader handleLogout={handleLogout} />
              <h1>here is discover page</h1>
    </>
               
)
}
