import React, { Suspense } from 'react';
import Spinner from '../components/UI/Spinner/Spinner';

const waitingComponent = (Component) => (props) => (
    <Suspense fallback={<Spinner />}>
        <Component {...props} />
    </Suspense>
);

export default waitingComponent;
