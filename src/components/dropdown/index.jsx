import Creatable, { makeCreatableSelect } from 'react-select/creatable';

import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

export class Dropdown extends Component {
    render() {
        return (
            <CreatableSelect
                placeholder={this.props.placeholder}
                isMulti
                options={this.props.options}
                onChange={this.props.handleChange}
            />
        );
    }
}
