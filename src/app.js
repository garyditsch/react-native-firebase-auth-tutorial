import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDk6ml8JDvnu5LuEy62So9MIn2-H57nVak",
            authDomain: "auth-57120.firebaseapp.com",
            databaseURL: "https://auth-57120.firebaseio.com",
            projectId: "auth-57120",
            storageBucket: "auth-57120.appspot.com",
            messagingSenderId: "825511459271"
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return
                    <CardSection>
                        <Button onPress={() => firebase.auth.signOut()}>
                            Log Out
                        </Button>
                    </CardSection>;
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
