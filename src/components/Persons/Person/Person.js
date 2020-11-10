import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

import classes from './Person.css';

// const person = ( props ) => {
//     // const rnd = Math.random();

//     // if ( rnd > 0.7 ) {
//     //     throw new Error( 'Something went wrong' );
//     // }
//     return (
//         <div className={classes.Person}>
//             <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
//             <p>{props.children}</p>
//             <input type="text" onChange={props.changed} value={props.name} />
//         </div>
//     )
// };
class Person extends Component {
    render() {
      console.log('[Person.js] rendering...');
      return (
        <Aux>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
      );
    }
  }
  //複数人での開発時には有用なPropsTypes
  Person.propTypes = {
      click:PropTypes.func,
      name:PropTypes.string,
      age:PropTypes.number,
      changed:PropTypes.func
  };

  export default withClass(Person, classes.Person);//hoc関数でPersonコンポーネントにclassを追加
