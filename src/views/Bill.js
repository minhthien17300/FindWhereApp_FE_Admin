import { useEffect } from "react";

import "./Bill.css";
import { get, post } from 'helper/fetch.helper'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Table,
  } from "reactstrap";

export default function Bill() {
    const GetURLParameter = (sParam) => {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    };

    useEffect(() => {
        (
            async () => {
                const id = GetURLParameter('id');
                const response = await post('https://findwhere-app.herokuapp.com/order/paymentConfirm', { id: id });
                if (response.success) {
                    console.log("success")
                }
            }
        )();
    }, [])
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h2 className="title">Payment Success</h2>
                            </CardHeader>
                            <CardBody>
                                <h5>Now you can close this website and return to the app</h5>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}