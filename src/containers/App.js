import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';//contextで値を共有するcomponentをラップする
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props) {
  super(props);
  console.log('[App.js] constructor');
}
  state = {
    persons: [
      { id: 'asfa1', name: 'Messi', age: 28 },
      { id: 'vasdf1', name: 'Ronaldo', age: 29 },
      { id: 'asdf11', name: 'Van Dijk', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter:0,
    authenticated:false
  }
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  // componentWillMount() {//非推奨constructorと同じ機能
  //   console.log('[App.js] componentWillMount');
  // }
  componentDidMount() {//最初の一回だけ呼び出される
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }
  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // this.setState({
    //    persons: persons,
    //    changeCounter:this.state.changeCounter + 1
    //    //synchronous関数内で直接stateを操作するのは避ける(最新のstateが渡っている保証がないため)
    //   });
    this.setState((prevState,props)=>{//callbackの引数には自動的に直前のstateが渡る
      return{
        persons:persons,
        changeCounter:prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }
  loginHandler =()=>{
    this.setState({authenticated:true});

  }

  render () {
    console.log('[App.js] render');
    let persons = null;


    if ( this.state.showPersons ) {
      persons = (<Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
          />);


    }


    return  (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider value={{
          authenticated:this.state.authenticated,
          login:this.loginHandler}}>
        {this.state.showCockpit ? (
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            
          />
        ) : null}
        {persons}
        </AuthContext.Provider>
        </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);//hoc関数でAppコンポーネントにクラスを追加
