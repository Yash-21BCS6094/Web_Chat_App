import React from 'react'
import Card from './Card'
function ForgotPage() {
    let showH4 = false;
    let button = "Submit";
    let image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxf1peulPlZPsz2lOOhMruc8dEMo7FxrAUw&usqp=CAU"
    return (
        <Card
            button={button}
            showH4={showH4}
            placeholder={"Enter OTP"}
            image={image}
        />
    )
}

export default ForgotPage