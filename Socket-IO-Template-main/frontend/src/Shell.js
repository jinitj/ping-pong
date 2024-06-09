import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './shell.css';
import Header from './components/Header';
import Footer from './components/Footer';

const Shell = (props) => {
    const { children } = props;

    return (
        <div className='shell'>
            {/* <div className="shell-header">
                <Header/>
            </div> */}
            <div className="shell-content">
                {children}
            </div>
            {/* <div className="shell-footer">
                <Footer/>
            </div> */}
        </div>
    );
};

Shell.propTypes = {
    children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps,
)(Shell);