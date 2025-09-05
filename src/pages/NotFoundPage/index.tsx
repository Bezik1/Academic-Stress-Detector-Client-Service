import './index.css'

import { useEffect } from 'react';
import { motion } from 'framer-motion';

import ErrorPage from "../ErrorPage"
import { pageTransition } from '../../animations/routes';
import { useDispatch } from 'react-redux';
import { setError } from '../../state/error/errorSlice';

const NotFoundPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setError({
            status: "404",
            message: "Page not Found",
        }))
    }, []);

    return (
            <motion.div {...pageTransition}>
                <ErrorPage />
            </motion.div>
    );
};

export default NotFoundPage;