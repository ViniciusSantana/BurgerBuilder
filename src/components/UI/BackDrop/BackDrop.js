import React from 'react';
import styles from './BackDrop.module.css';

const backdrop = (props) => (
    props.show ? <div className={styles.BackDrop} onClick={props.clicked} /> : null
);

export default backdrop;
