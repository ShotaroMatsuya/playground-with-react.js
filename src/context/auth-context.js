import React from 'react'
//contextで定義したオブジェクトはpropsで受け渡さずに各コンポーネントで共有することができる。
const authContext = React.createContext({
    authenticated:false,
    login:()=>{}
});

export default authContext;