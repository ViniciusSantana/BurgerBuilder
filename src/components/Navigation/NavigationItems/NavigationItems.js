import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const { isAuthenticated } = props;
    console.log(`Is authenticated is ${isAuthenticated}`);

    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem>}
        </ul>
    );
};

export default navigationItems;
