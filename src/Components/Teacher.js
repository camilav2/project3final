import React, { Component } from 'react'
// import { SearchField, onEnter, onSearchClick } from "react-search-field";


export default class Teacher extends Component {
    render() {
        return (
            <div>
                {/* <div className='search-bar'>
                    <SearchField
                        placeholder='Search item'
                        onEnter={onEnter}
                        onSearchClick={onSearchClick}
                    />
                </div> */}
                <div className='my-students'>
                    <p>NAME</p>
                    <p>CITY</p>
                </div>
                <div className='timetable-teacher'>
                    <p>Your next class is on DATE at TIME at LOCATION/ONLINE</p>
                </div>
                <div className='payment-teacher'>
                    Your next payment is to be received on DATE from STUDENT NAME
                </div>

            </div>
        )
    }
}