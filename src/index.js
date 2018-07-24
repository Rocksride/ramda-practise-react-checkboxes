// random comment
import React from 'react'
import ReactDom from 'react-dom'
import {equals, fromPairs, lensProp, over, view, set, lensIndex, flip,ifElse, addIndex, call, zipWith,contains, insert, converge, head, identity, toPairs, always, split, prop, groupBy, zipObj, compose, pipe, map } from 'ramda'

const $ = document.querySelector.bind(document)
// making all Ramda's methods global
const permissions = {
    'group1-perm1': true,
    'group1-perm2': true,
    'group2-perm1': true,
    'group2-perm2': true,
    'perm3': true,
    'perm4': false,
    'perm5': true
}
const KEYS = ['value', 'checked', 'label']
const addLabel = ifElse(pipe(head, contains('-')),
    converge(insert(2), [pipe(head, split('-'), head), identity]),
    identity
)
const groupName = ifElse(
    compose(contains('-'), prop('value')),
    compose(head, split('-'), prop('value')),
    always('general')
)
const convert = pipe(addLabel, zipObj(KEYS))
const mapPermissionsToLists = compose(
    groupBy(groupName),
    map(convert),
    toPairs
);

const CheckList = ({data, onChange }) => {
    const handleChange = e => {
        const perms = lensIndex(1);
        const value = lensProp('value')
        const checked = lensProp('checked')

        const isPerm = compose(equals(e.target.value), view(value));
        const changePerm = set(checked, e.target.checked);

        const checkPerm = ifElse(isPerm, changePerm, identity)
        const updateGroup = over(perms, map(checkPerm));

        const updateData = compose(fromPairs, map(updateGroup), toPairs)
        onChange(updateData(data));
    }
    const h3 = str => <h3 key={str}>{str}</h3>
    const li = item => <li key={item.value}>

        <label>
            <input 
                type="checkbox"
                value={item.value}
                onChange={handleChange}
                checked={item.checked} />
        </label>
    </li>
    const ul = items => <ul>{items.map(li)}</ul>
    const div = (children, key) => <div key={key}>{children}</div>

    const fn = compose(
        flip(div)('x'),
        addIndex(map)(div),
        map(zipWith(call, [h3, ul])), 
        toPairs)
    console.log(data);
    
    // console.log(fn(data));
    return fn(data);
}

ReactDom.render(
    <CheckList 
        data={mapPermissionsToLists(permissions)} 
        onChange={console.log}/>,
    $('#root')
)