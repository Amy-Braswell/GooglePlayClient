import React from 'react'
// import moment from 'moment'

export default function GoogleApp(props) {
    return(
        <div className="googleApp">
            <h2>{props.App}</h2>
            {/* <div className="updated">Last updates: {moment(props.Last_Updated).format('DD MMM YYYY')}</div> */}
            <div className="rating">Rating: {props.Rating}</div>
            <div className="popularity">Installs: {props.Installs}</div>
            <div className="genre">Genre(s): {props.Genres}</div>
        </div>

    )
}