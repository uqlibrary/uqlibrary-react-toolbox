import React from 'react';
import {PropTypes} from 'prop-types';
import {findDOMNode} from 'react-dom';
import Highcharts from 'highcharts';

class Chart extends React.Component {
    static propTypes = {
        chartOptions: PropTypes.object.isRequired,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.chart = null;
    }

    componentDidMount() {
        const chartNode = findDOMNode(this.refs.chart);
        this.chart = chartNode ? new Highcharts.Chart(chartNode, this.props.chartOptions) : null;
    }

    componentDidUpdate() {
        if (this.chart) {
            this.chart.update(this.props.chartOptions);
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    render() {
        return (
            <div className={this.props.className} ref="chart" />
        );
    }
}

export default Chart;


