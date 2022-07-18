import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import appStyles from '../../App.module.css';
import NotFound from '../../assets/notfound.jpg';
import styles from '../../styles/CreateEditPostProfile.module.css';


const PageNotFound = () => {
  return (
    <Row className={appStyles.RowMargin}>
            <Col className={styles.PostColImage}>
                <Image className={styles.PostFormImage} src={NotFound} alt="A sign on a tree reading 'Dead end'."/>       
            </Col>
            <Col className={appStyles.ColForm}>
                <Container>
                    <h1 className={appStyles.FormHeader}>*** 404 ***</h1>
                    <h2>Oh no, this path is a dead end! Please try finding your way back again...</h2>
                    <Link to="/" aria-label='Click to go back to the home page'>
                    <i class="fa-solid fa-house"></i>
                    </Link>
                </Container>
            </Col>
        </Row>
  )
}

export default PageNotFound;