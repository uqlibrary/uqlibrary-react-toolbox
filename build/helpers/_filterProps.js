"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = filterProps;
function filterProps(props) {
    var validProps = Object.assign({}, props, props.input);

    delete validProps.input;
    delete validProps.meta;
    delete validProps.helpText;
    delete validProps.helpTitle;

    validProps.errorText = props.forceError || props.meta && props.meta.touched ? props.meta.error || props.meta.warn || undefined : undefined;
    return validProps;
}