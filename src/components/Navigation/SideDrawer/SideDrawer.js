import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';


const sideDrawer = (props) => {
    const { open, closed, isAuth } = props;
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    return (
        <>
            <BackDrop show={open} clicked={closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuth} />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;
