import PageHeader from "../../components/PageHeader/PageHeader";
import { Card, Icon, Image, List } from "semantic-ui-react";
import { useState, useEffect } from "react";





export default function DiscoverPage({ handleLogout, loggedUser }) {

    const [recipe, setRecipe] = useState('');
    const [gif, setGif] = useState('chicken')
    const [render, setRender] = useState(false)


    useEffect(() => {
        const apiUrl = ` https://api.spoonacular.com/recipes/random?apiKey=01503801ca734bf0af8dca9c1094e03f&number=25`;



        async function makeApiCall() {
            try {
                const responseJson = await fetch(apiUrl)
                console.log(responseJson)
                const data = await responseJson.json()
                console.log(data.recipes, "___________________________")
                setRecipe(data.recipes)

            } catch (err) {
                console.log(err)
            }

        }
        makeApiCall();
    }, []);

    const recipes = recipe ? recipe.map(r => {
        <Card>
            <Image src={r.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{r.title}</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>

                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    10 Friends
                </a>
            </Card.Content>
        </Card>
    }) : null;

    return (
        <>
            <PageHeader handleLogout={handleLogout} />
            {recipes}
        </>

    )
}
