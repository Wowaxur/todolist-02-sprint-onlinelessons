import { store } from './state/store/store'
import { Provider } from 'react-redux'
import AppWithRedux from "./AppWithRedux";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root')
)