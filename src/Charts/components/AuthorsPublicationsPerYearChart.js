import React from 'react';
import {PropTypes} from 'prop-types';
import Chart from './Chart';

class AuthorsPublicationsPerYearChart extends React.Component {

    static propTypes = {
        yAxisTitle: PropTypes.string,
        series: PropTypes.array,
        categories: PropTypes.array,
        className: PropTypes.string
    };

    static defaultProps = {
        yAxisTitle: 'Total publications',
        series: [],
        categories: []
    };

    constructor(props) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: null
                },
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                xAxis: {
                    categories: this.props.categories,
                    labels: {
                        rotation: -45,
                        y: 18
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: this.props.yAxisTitle
                    },
                    stackLabels: {
                        enabled: true
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'vertical',
                    x: -30,
                    y: -10,
                    floating: true,
                    shadow: false
                },
                tooltip: {
                    // TODO: fix formatter display of tooltip - this.x is no longer in the correct scope
                    // formatter: () => {
                    //     return '<b>' + this.x + '</b><br/>' +
                    //         this.series.name + ': ' + this.y + '<br/>' +
                    //         'Total: ' + this.point.stackTotal;
                    // }
                },
                series: this.props.series
            }
        };
    }

    render() {
        return (
            <Chart className={this.props.className + ' authors-publications-per-year-chart'} chartOptions={this.state.options} />
        );
    }
}

export default AuthorsPublicationsPerYearChart;
