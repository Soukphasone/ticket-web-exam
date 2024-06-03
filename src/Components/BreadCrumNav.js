import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    breadcrumb: {
        fontSize: '14px',
        margin: '10px 0',
    },
    breadcrumbItem: {
        display: 'inline',
        color: '#007bff',
        textDecoration: 'none',
    },
    separator: {
        margin: '0 5px',
    }
};

const Breadcrumb = ({ paths }) => {
    return (
        <nav style={styles.breadcrumb}>
            {paths.map((path, index) => (
                <span key={index}>
                    <Link to={path.link} style={styles.breadcrumbItem}>
                        {path.label}
                    </Link>
                    {index < paths.length - 1 && (
                        <span style={styles.separator}>/</span>
                    )}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
