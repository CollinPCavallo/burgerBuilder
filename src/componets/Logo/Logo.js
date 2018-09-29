import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img alt='Logo'src={burgerLogo} style={{ height: props.height }} />
    </div>
)
export default logo;