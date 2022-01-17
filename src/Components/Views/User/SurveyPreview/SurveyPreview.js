import React from 'react'
import { collection, query, onSnapshot, where } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../../Firebase/Firebase';
import { setDoc, doc } from 'firebase/firestore'
const ansArr = []
let optionArr = []
const SurveyPreview = (prop) => {
    const [survey, setSurvey] = useState([])
    const [qesCountEnd, setQesCountEnd] = useState(1)
    const [qesCountStart, setQesCountStart] = useState(0)
    const [optNum, setOptNum] = useState(1)
    const [ans, setAns] = useState()
    const [dataAns, setDataAns] = useState();
    const [comments, setComments] = useState();
    const [surveyAns, setSurveyAns] = useState([])

    useEffect(() => {
        const q = query(collection(db, "Survey"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const surveyArr = [];
            querySnapshot.forEach((doc) => {
                surveyArr.push(doc.data())
            });
            setSurvey(surveyArr)
        });

    }, [])
    let emailString = prop.email.toString()
    useEffect(() => {
        console.log(prop.email.toString());
        const qry = query(collection(db, "SurveyAns"));
        const q = query(qry, where("ansBy", "==", emailString));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const surveyAnsArr = [];
            querySnapshot.forEach((doc) => {
                surveyAnsArr.push(doc.data())
            });
            setSurveyAns(surveyAnsArr)
        });

    }, [prop.email])

    const surveyAnsMap = surveyAns.map((elements) => {
        return (elements.surveyAns.map((element) => {

            return (
                <div>
                    {(element.questionType == 'multiple') ? < div >
                        <h3>Q) {element.question}</h3>
                        <h5>Selected Options</h5>
                        {element.selectedOpt.map((el) => {
                            return (
                                <div>
                                    <input type="checkbox" disabled id={el.opt} name='multiple' checked value={el.opt} />
                                    <label for={el.opt}> {el.opt}</label><br />
                                    {"Comment:" + element.comment}
                                </div>
                            )
                        })}
                    </div> : ''
                    }
                    {(element.questionType == 'single') ? <div> <h3>Q) {element.question}</h3>
                        <h5>Selected Options</h5>
                        <input type="radio" id={element.ans} disabled checked value={element.ans} />
                        <label for={element.ans}> {element.ans}</label><br />
                        {"Comment:" + element.comment}
                    </div> : ''}

                    {(element.questionType == 'data') ? <div> <h3>Q) {element.question}</h3>
                        <h5>Answer</h5>
                        {element.ans}<br />
                        {"Comment:" + element.comment}
                    </div> : ''}
                </div >
            )
        }))
    })
    const serveyMap = survey.map((elements, pos) => {
        return (elements.surveyQuestions.slice(qesCountStart, qesCountEnd).map((element) => {

            const onSingleAnsHandler = (e) => {
                setAns(e.target.value);

            }

            const surveyCommentsHandler = (e) => {
                setComments(e.target.value)
            }
            const onMultipleAnsHandler = (e) => {
                optionArr.push({
                    opt: e.target.value,
                    ans: 'selected'
                    // [e.target.id]:e.target.checked
                })

            }
            const onDataAnsHandler = (e) => {
                setDataAns(e.target.value)
            }
            const increment = () => {
                setQesCountStart(qesCountStart + 1)
                setQesCountEnd(qesCountEnd + 1)
                setOptNum(optNum + 1)
                if (element.questionType == 'multiple') {
                    ansArr.push({
                        questionType: element.questionType,
                        question: element.question,
                        selectedOpt: optionArr,
                        comment: comments
                    })
                    optionArr = []
                }
                if (element.questionType == 'single') {
                    ansArr.push({
                        questionType: element.questionType,
                        question: element.question,
                        ans: ans,
                        comment: comments
                    })
                }
                if (element.questionType == 'data') {
                    ansArr.push({
                        questionType: element.questionType,
                        question: element.question,
                        ans: dataAns,
                        comment: comments
                    })
                }
                setComments('')
                console.log(ansArr);

            }

            let questions = element.question
            return (
                <div>
                    {(element.questionType == 'multiple') ? < div >
                        <p>{questions}</p>
                        {element[`optionsOfQues${optNum}`].map((el) => {
                            return (
                                <div>
                                    <input type="checkbox" id={el.opt} name='multiple' value={el.opt} onChange={onMultipleAnsHandler} />
                                    <label for={el.opt}> {el.opt}</label><br />
                                </div>
                            )
                        })}
                    </div> : ''
                    }
                    {(element.questionType == 'single') ? <div> <p>{questions}</p>
                        <label><input type="radio" onChange={onSingleAnsHandler} name="failRes" value="yes" />Yes</label><br />
                        <label ><input type="radio" onChange={onSingleAnsHandler} name="failRes" value="no" /> No </label></div> : ''}

                    {(element.questionType == 'data') ? <div> <p>{questions}</p>
                        <input type="text" onChange={onDataAnsHandler} />
                    </div> : ''}


                    <div><textarea placeholder='Enter Comments' name="w3review" rows="4" onChange={surveyCommentsHandler} cols="50"></textarea></div>
                    <button onClick={increment}>Next</button>

                </div >
            )

        }));
    })

    const onSubmitHandler = () => {
        setDoc(doc(db, 'SurveyAns', prop.email), {
            surveyAns: ansArr,
            ansBy: prop.email
        })
    }
    console.log(ansArr);
    return (
        <div>
            {serveyMap}
            <button onClick={onSubmitHandler}>Submit</button>
            {surveyAnsMap}

        </div>
    )
}

export default SurveyPreview
