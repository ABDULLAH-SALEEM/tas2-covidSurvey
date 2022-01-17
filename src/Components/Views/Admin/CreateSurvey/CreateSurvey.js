import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../../Firebase/Firebase'
import './CreateSurvey.css'


const hideStyle = {
    display: "none"
}
const showStyle = {
    display: "block"
}
const failResHide = {
    display: "none"
}
const questionsArr = []
let optionArr=[]

const CreateSurvey = () => {
    const [question, setQuestion] = useState()
    const [quesType, setQuesType] = useState('single')
    const [style, setStyle] = useState(hideStyle)
    const [failResStyle, setFailResStyle] = useState()
    const [failRes, setFailRes] = useState()
    const [opt , setOpt]=useState()

    const onFailResChangeHandler = (e) => {
        setFailRes(e.target.value)
    }
    const onOptChangeHandler=(e)=>{
        setOpt(e.target.value)
    }

    const surveyCreationHandler = (e) => {
        e.preventDefault();
        setDoc(doc(db, 'Survey', 'covidSurvey'), {
            surveyQuestions: questionsArr,
        })

    }

    const resTypeChangeChangeHandler = (e) => {
        setQuesType(e.target.value);
        if (e.target.value == "multiple") {
            setStyle(showStyle)
            setFailResStyle(failResHide)
        } else if (e.target.value == "single") {
            setStyle(hideStyle)
            setFailResStyle()
        } else if (e.target.value == "data") {
            setFailResStyle(failResHide)
            setStyle(hideStyle)
        }

    }

    const onQuesChangeHandler = (e) => {
        setQuestion(e.target.value)
    }
    const optArrHandler=()=>{
        optionArr.push(
            {
                opt,
                failRes
            }
        )
        setOpt('')

    }
    const [optNum, setOptNum]=useState(1)
    const saveQuestionHandler = () => {
        if (quesType == 'single') {
            questionsArr.push(
                {
                    question,
                    questionType: quesType,
                    failRes: failRes
                }
            )
        }
        if(quesType == 'multiple'){
            
            questionsArr.push(
                {
                    question,
                    questionType: quesType,
                    [`optionsOfQues${optNum}`] :optionArr
                }
            )
        }
        if(quesType == 'data'){
            questionsArr.push(
                {
                    question,
                    questionType: quesType,
                }
            )
        }
        setQuestion('')
        setOptNum(optNum+1)
        optionArr=[]
        console.log(optionArr);
    }

    return (
        <div>
            <form onSubmit={surveyCreationHandler}>
                <div className='questionArea'>
                    <div>
                        <TextField value={question} onChange={onQuesChangeHandler} id="standard-basic" variant="standard" label="Enter Question" />
                    </div>
                    <div style={failResStyle}>
                        <p>Fail Response</p>
                        <input type="radio" id="yes" name="failRes" value="yes" onChange={onFailResChangeHandler} />
                        <label for="yes">Yes</label>
                        <input type="radio" id="no" name="failRes" value="no" onChange={onFailResChangeHandler} />
                        <label for="no">No</label>
                    </div>
                    <div>
                        <label for="resType">Type Of Response</label>

                        <select name="resType" id="resType" onChange={resTypeChangeChangeHandler}>
                            <option value="single" selected>Single</option>
                            <option value="multiple">Multiple</option>
                            <option value="data">Data</option>
                        </select>

                    </div>
                </div>
                <div style={style}>
                    <div className='optionArea'>
                        <div>
                            <p>Options</p>
                            <TextField value={opt} id="standard-basic" variant="standard" onChange={onOptChangeHandler} label="Enter Option" />
                        </div>
                        <div>
                            <p>Fail Response</p>
                            <input type="radio" id="optYes" name="failRes" value="Yes" onChange={onFailResChangeHandler} />
                            <label for="optYes">Yes</label>
                            <input type="radio" id="optNo" name="failRes" value="No" onChange={onFailResChangeHandler}  />
                            <label for="optNo">No</label>
                        </div>
                        <Button onClick={optArrHandler}>Add</Button>
                    </div>
                </div>
                <div>
                    <Button onClick={saveQuestionHandler}>Save</Button>
                </div>
                <Button type='submit'>Create Survey</Button>
            </form>
        </div>
    )
}

export default CreateSurvey
