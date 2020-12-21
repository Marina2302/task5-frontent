import Creatable, { makeCreatableSelect } from 'react-select/creatable';

import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

export class Dropdown extends Component {
    render() {
        return (
            <CreatableSelect
                isMulti
                options={this.props.options}
                onChange={this.props.handleChange}
            />
        );
    }
}

// export function Dropdown({ name, label, initialValue = [], suggestions = [], handleChange, placeholder = "type a new tag" }) {
//
//     const baseTagifySettings = {
//         blacklist: [],
//         maxTags: 6,
//         backspace: "edit",
//         placeholder,
//         editTags: 1,
//         dropdown: {
//             enabled: 0
//         },
//         callbacks: {}
//     }
//
//     const settings = {
//         ...baseTagifySettings,
//         whitelist: suggestions,
//         callbacks: {
//             add: handleChange,
//             remove: handleChange,
//             blur: handleChange,
//             edit: handleChange,
//             invalid: handleChange,
//             click: handleChange,
//             focus: handleChange,
//             "edit:updated": handleChange,
//             "edit:start": handleChange
//         }
//     };
//
//     return (
//         <div className="form-group">
//             <label htmlFor={"field-" + name}>{label}</label>
//             <Tags settings={settings} initialValue={initialValue} />
//         </div>
//     );
// }
