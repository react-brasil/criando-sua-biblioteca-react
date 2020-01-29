import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ error, description }) => (
  <div style={styles.root}>
    <h2 style={styles.error}>{error}</h2>
    <h4 style={styles.description}>{description}</h4>
  </div>
);

const styles = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 30%",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: "#EAEAEA",
    fontFamily: "arial"
  },
  error: { fontSize: 100, fontWeight: 700, margin: 0 },
  description: { fontSize: 40, fontWeight: 100, margin: 0 }
};

ErrorComponent.propTypes = {
  error: PropTypes.number,
  description: PropTypes.string
};

export default ErrorComponent;
