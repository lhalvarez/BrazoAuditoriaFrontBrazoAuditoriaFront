import React from 'react';
import PropTypes from 'prop-types';

const ContainerTitle = ({title}) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">{title}</h1>
            </div>
        </div>
    );
};

ContainerTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default ContainerTitle;
