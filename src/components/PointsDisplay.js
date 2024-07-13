import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPoints } from '../actions/auth';

const PointsDisplay = ({ getPoints, points }) => {
    useEffect(() => {
        getPoints();
        const interval = setInterval(() => {
            getPoints();
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [getPoints]);

    return (
        <div>
            <h1>Puntos</h1>
            <p>Total de puntos: {points}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    points: state.auth.points
});

export default connect(mapStateToProps, { getPoints })(PointsDisplay);
