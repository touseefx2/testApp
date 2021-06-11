/**
 * @format
 */
 import React   from "react";
import 'react-native-gesture-handler';
import {AppRegistry,LogBox,StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'mobx-react';
import  store from "./src/mobx/contactStore"

 
LogBox.ignoreAllLogs(true);
StatusBar.setBackgroundColor("black");

function MainApp() {
    
    return(
             <Provider store={store}>
                  <App/>
              </Provider>
              )
    }
 

AppRegistry.registerComponent(appName, () => MainApp);
