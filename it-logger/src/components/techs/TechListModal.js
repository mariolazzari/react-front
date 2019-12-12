import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TechItem from "./TechItem";
import { getTechs } from "../../actions/techActions";

//const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
const TechListModal = ({ getTechs, loading, techs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {!loading &&
            techs !== null &&
            techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  techs: state.tech.techs,
  loading: state.tech.loading
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
