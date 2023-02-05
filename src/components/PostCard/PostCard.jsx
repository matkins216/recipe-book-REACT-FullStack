import { Card, Icon, Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";


function PostCard({ post, isProfile, addLike, removeLike, loggedUser }) {


  const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username)

  const likeColor = likedIndex > -1 ? 'red' : 'grey'

  const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)

  const ingredients = post.ingredients


  const elimateSpaces = (longString) => {
    return longString?.replace(/,/g, ', ');
  }

  const formatTheGoodies = (string) => {
    return string.split(', ')
  }

  const spaceOutIngredients = elimateSpaces(ingredients);

  const formattedIngredients = formatTheGoodies(spaceOutIngredients);

  const spacedOutDirections = elimateSpaces(post.directions);
  const formattedDirections = formatTheGoodies(spacedOutDirections);

  console.log('formattedDirections', formattedDirections);

  return (
    <Card key={post._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header TextAlign="right">
            <Link to={`/${post.user.username}`}>
              <Image
                size="medium"
                avatar
                src={
                  post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {post.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}

      <Image verticalAlign="top" src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Header textAlign="center">{post.title}</Card.Header>
      <Card.Content>

        <Card.Description>
          <div>
            <strong>Ingredients:</strong>
            <List>
              {formattedIngredients?.map(ingredient => (
                <List.Item>{ingredient}</List.Item>
              ))}
            </List>
          </div>
          <div>
            <strong>Directions:</strong>
            <List>
              {formattedDirections?.map(directionStep => (
                <List.Item>{directionStep}</List.Item>
              ))}
            </List>
          </div>
        </Card.Description>


      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler} />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;


