import { Card, Icon, Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";


function PostCard({ post, isProfile, addLike, removeLike, loggedUser }) {

  //If the logged in user’s username in the likes array, 
  //then the logged in user has liked the photo so the color should be red

  // 1. search the likes array and see if the loggedUser.username exists in the likes array
  const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username)
  // like.username === loggedUser.username <- if this true it returns the index 0  or greater
  // like.username === loggedUser.username <- if this is false it returns -1
  const likeColor = likedIndex > -1 ? 'red' : 'grey'
  // if the likedIndex is 0 or greater that means the loggedUser username is in the 
  // post.likes array, which means they have liked the post so color should be red
  const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)
  /// FOR THE ARGUMENTS go remind yourself what they need by looking at the util function! or your routes on the backend
  //if the logged user’s username is NOT in the likes array,
  // then the logged in user has NOT like the photo so the color should be grey

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


