import React,{useEffect,useRef,useContext} from 'react'
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context'


const cockpit = (props)=>{
  const toggleBtnRef = useRef(null);
  // toggleBtnRef.current.click();//renderが実行される前に実行されるのでこの場所で呼び出すのは不適切
  const authContext = useContext(AuthContext);//useContextの引数にContextオブジェクトをセットすることでfunctionalコンポーネント内のjsxでauthContextという変数でアクセスできるようになる。
  console.log(authContext.authenticated);
    useEffect(() => {//componentDidMountのタイミングで実行
        console.log('[Cockpit.js] useEffect');
        // Http request...
        // setTimeout(() => {
        //   alert('side effectの実行');
        // }, 1000);
        toggleBtnRef.current.click();//domがrenderingされたあとに実行
        return () => {//componentWillUnmountのタイミングで実行
          console.log('[Cockpit.js] cleanup work in useEffect');
        };
      }, []);
    
      useEffect(() => {//componentがrenderingされるたび毎回実行される(cleanUpFunctionも同様)
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {//cleanUpFunctionのほうがさきに呼び出されるのでmainFunctionをここで打ち消すことができる
          console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
      });
    const assignedClasses = [];
    let btnClass='';
    if(props.showPersons){

        btnClass = classes.Red;
    }
    if ( props.personsLength <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( props.personsLength <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
              ref={toggleBtnRef}
              className={btnClass}
              onClick={props.clicked}>Toggle Persons</button>
              {/* <AuthContext.Consumer>
              {(context)=><button onClick={context.login}>Log in</button>}

              </AuthContext.Consumer> */}
              <button onClick={authContext.login}>Log in</button>

        </div>
    );
}

export default React.memo(cockpit);
//関数コンポーネントではshouldComponentUpdateの代わりにReact.memoを使用する
//親から渡されるpropsに変化がないときはrenderingされないようになる