import React, { PureComponent }  from 'react';
import Person from './Person/Person';

//すべてのpropsの変化を監視したいときはshouldComponentUpdateの代わりにPureComponentを使えば良い

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //   console.log('[Persons.js] getDerivedStateFromProps');
    //   return state;
    // }
  
    // componentWillReceiveProps(props) {
    //   console.log('[Persons.js] componentWillReceiveProps', props);
    // }
  

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if (nextProps.persons !== this.props.persons) {
    //       return true;//親から渡されたpropsと現在のpropsに違いがある場合のみrendering実行
    //     } else {
    //       return false;//propsに変化がなければrenderingは行われない
    //     }
    //     // return true;
    //   }
  
    getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log('[Persons.js] getSnapshotBeforeUpdate');
      return { message: 'Snapshot!' };
    }
  
    // componentWillUpdate() {
  
    // }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('[Persons.js] componentDidUpdate');
      console.log(snapshot);
    }
  
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
      }    
      render() {
      console.log('[Persons.js] rendering...');
      return this.props.persons.map((person, index) => {
        return (
          <Person
            click={() => this.props.clicked(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={event => this.props.changed(event, person.id)}
            
          />
        );
      });
    }
  }
export default Persons;