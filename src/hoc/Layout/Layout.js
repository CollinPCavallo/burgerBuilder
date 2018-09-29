import React, { Component } from 'react';
import Aux from '../Auxil/Aux'
import classes from './Layout.css'
import Toolbar from '../../componets/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componets/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showSide: false
    }
    showSideHandler = () => {
        this.setState({ showSide: true });
    }
    closeSideHandler = () => {
        this.setState({ showSide: false});
    }



    render() {
        return (
            <Aux>
            <Toolbar menuClicked={this.showSideHandler}/>
            <SideDrawer
                open={this.state.showSide}
                closeSide={this.closeSideHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
        )
    }

}

export default Layout;