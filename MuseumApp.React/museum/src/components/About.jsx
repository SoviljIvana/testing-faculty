import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText} from 'react-bootstrap';

class About extends React.Component {
    render() {
        return (
            <Container>
                <h1>O muzeju </h1>
                <p> 
                    Izloženi predmeti svedoče o trajanju ljudskih zajednica i kultura od paleolita i mezolita, od prvih ljudskih tragova kod Iriga 
                    starih 40.000 godina, preko starčevačke, vinčanske i drugih neolitskih kultura, do mitskih vremena stare Grčke i velelepnih spomenika 
                    imperijskog Rima, od seobe naroda do smena etničkih zajednica.
                </p>
            </Container>
        );
    }
}
export default withRouter(About);
