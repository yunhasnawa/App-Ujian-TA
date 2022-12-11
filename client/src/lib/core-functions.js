import {useParams, useNavigate} from "react-router-dom";
import React from "react";

export function withParamsNavigate(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()}/>;
}