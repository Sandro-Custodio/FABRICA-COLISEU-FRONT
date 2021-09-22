/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DebounceInput } from "react-debounce-input";
import "react-widgets/dist/css/react-widgets.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import Row from "../../common/layout/row";
import Grid from "../../common/layout/grid";
import changeFilterOT from "./actions";

Moment.locale("en");
momentLocalizer();

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localFilters: {}
    };
  }

  render() {
    const {
      filters,
      changeFilterOT
    } = this.props;
    const { localFilters } = this.state;

    if (
      Object.keys(filters).length === 0 &&
      Object.keys(localFilters).length > 0
    ) {
      this.setState({
        localFilters: {}
      });
    }

    return (
      <div className="box-body">
        <Row>
          <Grid cols="12">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Múltiplos Códigos OT</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="5"
                      cols="40"
                      value={filters.ot_list || ""}
                      onChange={event => {
                        changeFilterOT({
                          ot_list: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos códigos, separe-os por ponto e vírgula( ; ) - Busca limitada à 100 OTs"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeFilterOT }, dispatch);
const mapStateToProps = state => ({
  filters: state.ot.filters
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
