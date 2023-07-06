import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
import './App.css';
import react, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {  // scren pe html ko render krna
    return (
      <div>
      <Navbar />
       <News />
      </div>
    )
  }  
}



