import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import SurveyPreview from '../SurveyPreview/SurveyPreview';

const styles={
    display:"none"
}
const showDiv={
    display:"block"
}
const Home = () => {

    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [style, setStyle]=useState(styles)
    const [surveyStyle, setSyrveyStyle]=useState(styles)

    const handleNameChange=(e)=>{
        setName(e.target.value)
        console.log(name);
    }

    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
        console.log(email);
    }

    const startSurvey=()=>{
        setStyle(showDiv)
    }

    const ShowSurveyStyle=()=>{
        setSyrveyStyle(showDiv)
    }
    return (
        <div>
            <button onClick={startSurvey}>Start Survey</button>
            <div style={style} >
               
                    <input type='text' onChange={handleNameChange} />
                    <input type='email' onChange={handleEmailChange} />
                    <button onClick={ShowSurveyStyle}>Submit</button>
                
            </div>
            <div style={surveyStyle}>
                <SurveyPreview name={name} email={email}/>
            </div>
        </div>
    )
}

export default Home
