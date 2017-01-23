import React from 'react';
import Styles from '../css/app.css';

export default class Footer extends React.Component{
    render(){
        return (
            <div className={Styles.footer}>
                <div className="container">
                    <p className="muted credit">Footer</p>
                </div>
            </div>
        );
    }
}