import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';

function connectComponent(Component) {
    return Component;
}
class ESClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {};

    render() {
        return (
            <View>
                <Text>
                    ESClass
                </Text>
            </View>
        );
    }
}


export default connectComponent(ESClass);