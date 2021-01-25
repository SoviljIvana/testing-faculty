import React from 'react';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import { FaUser, FaSearch } from 'react-icons/fa';
class Search extends React.Component {
    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl placeholder="Search" aria-describedby="basic-addon2" />
                <InputGroup.Append>
                    <Button > <FaSearch /></Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

export default Search;