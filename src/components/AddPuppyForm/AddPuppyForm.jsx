import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddRecipeForm({handleAddPost}) {

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('')
  const [photo, setPhoto] = useState(null)

  function handleChange(e){
	setDescription(e.target.value)
  }

  function handleFileInput(e){
	setPhoto(e.target.files[0])
  }

  function handleSubmit(e){
	e.preventDefault();

	// we have to make form data because we are sending over a photo
	// to our express server
	const formData = new FormData()
  formData.append('title', title)
	formData.append('description', description);
	formData.append('photo', photo)
	handleAddPost(formData)
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="title"
          value={title}
          placeholder="What do you call this dish?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="description"
          value={description}
          placeholder="How do we make this dish?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo"
          placeholder="upload image"
          onChange={handleFileInput}
        />
        <Button type="submit" className="btn">
          Recipe
        </Button>
      </Form>
    </Segment>
  );
}

export default AddRecipeForm;
