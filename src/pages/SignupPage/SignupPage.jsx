
import { Button, Form, Grid, Header, Segment, Icon, Message, Link } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";
import LoginPage from "../LoginPage/LoginPage";

function SignUpPage({ handleSignUpOrLogin }) {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        passwordConf: "",
        bio: "",
    });

    const [selectedFile, setSelectedFile] = useState("");

    const [error, setError] = useState("");

    
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append("photo", selectedFile);

        
        for (let key in state) {
            formData.append(key, state[key]);
        }

        
        console.log(formData.forEach((item) => console.log(item)));

        try {

            await userService.signup(formData); 
            handleSignUpOrLogin(); 
            navigate('/')

        } catch (err) {
            console.log(err.message, ' this is the error in signup')
            setError('Check your terminal, there was an error signing up')
        }




    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="green" textAlign="center">
                    <Icon name="food"></Icon> Sign Up
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="username"
                            placeholder="username"
                            value={state.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="passwordConf"
                            type="password"
                            placeholder="Confirm Password"
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                        />
                        <Form.TextArea
                            label="bio"
                            name="bio"
                            value={state.bio}
                            placeholder="Tell us more about yourself"
                            onChange={handleChange}
                        />
                        <Form.Field>
                            <Form.Input
                                type="file"
                                name="photo"
                                placeholder="upload image"
                                onChange={handleFileInput}
                            />
                        </Form.Field>
                        <Button type="submit" className="btn">
                            Signup
                        </Button>
                        
                    </Segment>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
                <Message>
                    Been here before? <Link to="/login">Login</Link>
                </Message>
                
            </Grid.Column>
        </Grid>
    );
}

export default SignUpPage;
