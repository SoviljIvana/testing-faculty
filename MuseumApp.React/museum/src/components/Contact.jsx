import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText } from 'react-bootstrap';

class Contact extends React.Component {
    render() {
        return (
            <Container>
                <h1>Kontakt </h1>
                <h6>
                    Muzej Vojvodine <br></br>
                    Dunavska 35-37 <br></br>
                    21101 Novi Sad<br></br>
                    Srbija<br></br>
                    Telefoni:<br></br>Dunavska 35: +381 (0)21 420-566<br></br>
                    Dunavska 37: +381 (0)21 526-555<br></br>
                    Direktor: +381 (0)21 520-135<br></br>
                    Služba za odnose sa javnošću: +381 (0)21 525-059<br></br>
                    Računovodstvo: +381 (0)21 525-146<br></br>
                    Faks:
                    +381 (0)21 520-135 <br></br>
                </h6>
            </Container>
        );
    }
}
export default withRouter(Contact);