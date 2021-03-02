
import React from 'react';
import './Spinner.css';

interface SpinnerProps {
    name: string,
    loading: boolean
}

const Spinner = (props: SpinnerProps) => {return (

<div style={{display: props.loading?"inline":"none"}}>
    <div style={{width:"100%", textAlign:"center"}}>
        <p className="bold">Loading</p>
        <p>{props.name}</p>
        <div className="loader"></div>
    </div> 
</div>     
)};

export default Spinner;