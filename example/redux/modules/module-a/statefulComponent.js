import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { View } from 'react-native';


const statefulComponent = createReactClass({
    displayName: 'statefulComponent',
    propTypes: {},

    render() {
        return (
            <View></View>
        );
    }
});


export default statefulComponent;