import React, {Fragment, Component} from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';   


class Layout extends Component{
    
    state ={
        showSideDrawer: false
    }

    sideDrawerCLoseHandler = () =>{
        this.setState({showSideDrawer:false});
    }
    
    sideDrawerToggleHandler = () =>{
        this.setState((prevState) =>{
            return    {showSideDrawer:!prevState.showSideDrawer};
        }
         );
    }


    render(){
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed = {this.sideDrawerCLoseHandler}/>
                <main className = {styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }

}
export default Layout;