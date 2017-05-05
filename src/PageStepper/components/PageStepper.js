import React from 'react';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import PropTypes from 'prop-types';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';

class PageStepper extends React.Component {

    static propTypes = {
        searchResults: PropTypes.object,
        children: PropTypes.array,
        formSections: PropTypes.array
    };

    state = {
        loading: false,
        finished: false,
        stepIndex: 0
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if (!this.state.loading) {
            this.dummyAsync(() => {
                this.setState({
                    loading: false,
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2,
                });
            });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    getComponent(children, step) {
        return children.filter( (comp) => {
            return comp.props['data-stepperIndex'] === step;
        });
    }

    // React.cloneElement allows us to add extra props onto a component dynamically
    updateProps() {
        return React.Children.map(this.props.children, child => {
            if (child) {
                return React.cloneElement(child, this.processProps(child));
            }

            return child;
        });
    }

    // optional functions that can be attached to a child component
    processProps(child) {
        let propsList = {};

        if (child) {
            if (child.props.stepperOnsubmit) {
                propsList = Object.assign({}, propsList, {onSubmit: this.handleNext});
            }

            if (child.props.stepperHandleNext) {
                propsList = Object.assign({}, propsList, {handleNext: this.handleNext});
            }

            if (child.props.stepperHandlePrevious) {
                propsList = Object.assign({}, propsList, {handlePrevious: this.handlePrev});
            }
        }

        return propsList;
    }

    render() {
        const {loading} = this.state;

        // update the props of each of the components to allow interaction with the stepper
        const children = this.updateProps();

        // retrieve all the components for the current stepIndex
        const currentComponent = this.getComponent(children, `${this.state.stepIndex}`);

        // build the step labels
        const steps = this.props.formSections.map((title, i) => {
            return (
                <Step key={i}>
                    <StepLabel style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>{title}</StepLabel>
                </Step>
            );
        });

        return (
            <div className="layout-fill">
                <h1 className="page-title display-1">Add a journal article</h1>

                {/* Stepper start */}
                <Stepper activeStep={this.state.stepIndex} style={{padding: '0 25px', margin: '-10px auto' }} onChange={this.handleNext}>
                    {steps}
                </Stepper>


                <div style={{width: '100%', maxWidth: '1200px', margin: 'auto'}}>
                    <ExpandTransition loading={loading} open>
                        {currentComponent}
                    </ExpandTransition>
                </div>
                {/* Stepper end */}
            </div>
        );
    }
}

export default PageStepper;
