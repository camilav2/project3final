import React, { Component } from 'react'
// import { SearchField, onEnter, onSearchClick } from "react-search-field";


export default class Student extends Component {
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
                <div className='my-teachers'>
                    <p>NAME</p>
                    <p>CITY</p>
                </div>
                <div className='timetable-student'>
                    <p>Your next class is on DATE at TIME at LOCATION/ONLINE</p>
                </div>
                <div className='payment-student'>
                    Your next payment is to due on DATE from STUDENT NAME
            </div>
            </div>
        )
    }
}