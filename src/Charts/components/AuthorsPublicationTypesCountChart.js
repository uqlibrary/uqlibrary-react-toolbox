import React from 'react';
import {PropTypes} from 'prop-types';
import Chart from './Chart';

class AuthorsPublicationTypesCountChart extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        series: PropTypes.array
    };

    static defaultProps = {
        series: [{
            name: 'Publications count by type',
            data: [
                ['Journal articles', 200],
                ['Conference papers', 150],
                ['Book chapters', 106],
                ['Books', 30],
                ['Other', 5]
            ]
        }]
    };

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 320,
                    plotShadow: false,
                    plotBorderWidth: 0,
                    spacingBottom: 10,
                    type: 'pie',
                },
                credits: {
                    enabled: false
                },
                legend: {
                    align: 'center',
                    symbolRadius: 0,
                    floating: true,
                    layout: 'vertical',
                    y: -100
                },
                tooltip: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        showInLegend: true,
                        dataLabels: {
                            connectorWidth: 0,
                            distance: -25,
                            // overflow: 'none',
                            className: 'pieLabels ',
                            format: '{y}',
                            useHTML: true,
                            enabled: true
                        },
                        shadow: false,
                        center: ['50%', '50%'],
                        size: '100%',
                        innerSize: '60%',
                        borderColor: 'none',
                    },
                },
                series: this.props.series
            }
        };
    }

    render() {
        return (
            <Chart className={this.props.className + ' authors-publication-types-count-chart'} chartOptions={this.state.options} />
        );
    }
}

export default AuthorsPublicationTypesCountChart;
