import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            id: '',
            showForm: true
        };
    }

    setRegistrationInputs = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    handleSubmit =  (event) => {
        event.preventDefault();
        //alert('Your username is: ' + this.state.first_name);

        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then((data) => {
                   this.getUserId(this.state.first_name,data);
                }
            )
            .catch(error => this.setState({ error }));
    };

    getUserId(first_name, data) {
        //Leanne Graham Ervin Howell
         let user_id = data.find(x => x.name === first_name).id
       // debugger
        this.setState({id: user_id, showForm: false})
    }

    render() {
        if (this.state.showForm) {
            return (
                <div id='my_registration_form'>
                    <form onSubmit={this.handleSubmit}>
                        <p>Enter email </p>
                        <input type='text'
                               name='email'
                               onChange={this.setRegistrationInputs}
                        />
                        <p> Enter first name </p>
                        <input type='text'
                               name='first_name'
                               onChange={this.setRegistrationInputs}
                        />
                        <p> Enter last name </p>
                        <input type='text'
                               name='last_name'
                               onChange={this.setRegistrationInputs}
                        />
                        <br/>
                        <br/>
                        <input type='submit'/>
                    </form>
                </div>
        );
    } else {
            return (
                <div> "Your Request has been submitted successfully and id is {this.state.id}" </div>
            );
        }
    }
}

ReactDOM.render(
  <Registration />,
  document.getElementById('root')
);
