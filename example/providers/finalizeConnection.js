import React from 'react';
import createReactClass from 'create-react-class';
import hoistStatics from 'hoist-non-react-statics';
import shallowCompare from 'react-addons-shallow-compare';


export default function finalizeConnection(Provider, Component) {
    const PureComponent = createReactClass({

        shouldComponentUpdate(nextProps, nextState) {
            return shallowCompare(this, nextProps, nextState);
        },

        render() {
            return <Provider {...this.props}/>;
        }
    });

    return hoistStatics(PureComponent, Component);
}