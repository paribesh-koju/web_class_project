import React, { useEffect } from 'react'
import { testApi } from '../../apis/Api'

const Homepage = () => {

    //print hello after page load, automatic
    useEffect(() => {
        console.log("Hello!")

        //calling test api
        testApi().then((res) => {
            console.log(res)

        })
    })



    return (
        <div>
            <h1>Homepage</h1>
        </div>
    )
}

export default Homepage