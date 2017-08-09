import React from 'react';
import {PropTypes} from 'prop-types';
import DonutChart from './DonutChart';

class AuthorsPublicationsCount extends React.Component {

    // TODO: should be immutableJs data
    static propTypes = {
        rawData: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        const series = this.rawData;

        this.state = {
            options: {
                chart: {
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
                    y: 0
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
                            connectorWidth: 2,
                            distance: 10,
                            overflow: 'none',
                            className: 'pieLabels ',
                            format: '{y}',
                            useHTML: true,
                            enabled: true
                        },
                        shadow: false,
                        center: ['50%', '40%'],
                        size: '75%',
                        innerSize: '70%',
                        borderColor: 'none',
                    },
                },
                series: series
                //     [{
                //     name: 'Document count by type',
                //     data: [
                //         ['Journal articles', 329],
                //         ['Conference papers', 112],
                //         ['Magazine articles', 106],
                //         ['Other', 12]
                //     ],
                // }]
            }
        };
    }

    render() {
        return (
              <DonutChart className="authors-publications-count" chartOptions={this.state.options} />
        );
    }
}

export default AuthorsPublicationsCount;
