import React, {Component} from 'react';
import Header from './header'
import store from "./store";
import {Provider} from 'react-redux'
import {GlobalIcon} from "./static/iconfont/iconfont";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Header/>
                <GlobalIcon/>
            </Provider>
        );
    }
}

export default App;
