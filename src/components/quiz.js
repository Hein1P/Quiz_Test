import React, {useEffect} from "react";
import getquiz from "./getquiz";
import { Container,Box,Stack,Button,Flex,Spacer,Alert,AlertIcon } from '@chakra-ui/react'
import axios from "axios";

const Quiz=()=>{

    const [state,setState] = React.useState([])
    const [count,setCount] = React.useState(0);
    const [correct,setCorrect] = React.useState(0);
    const [status,setStatus] = React.useState(null)
    const [click,setClick] = React.useState(false)

    useEffect(()=>{
        const getquiz = async () => {
            const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            //console.log("User ",response.data);
            setStatus(null)
            setState(response.data.results);
        }
        getquiz();
    },[])

    const correction=(data)=>{
        console.log("data",data.target.value)
        setStatus(data.target.value)
        setClick(true)
        if(data.target.value == arrindex){
            setCorrect(correct+1)
        }
    }
    const next=()=>{
        if(count < 9){
            setCount(count+1)
            setStatus(null)
            setClick(false)
        }
    }
    const prev=()=>{
        if(count > 0){
            setCount(count-1)
            setStatus(null)
        }

    }
    console.log('state', state[count])
    let answers =[]
    let arrindex;
    if(state.length >0){
        let correct_ans = state[count].correct_answer
        answers = [...state[count].incorrect_answers,correct_ans];
        arrindex= answers.indexOf(correct_ans)
        //console.log("answer",answers.indexOf(correct_ans))
    }

    return(<div>
        {state.length > 0 &&
            <Container maxW='3xl' bg='#ABD6DFFF' centerContent>
                <span>{count+1} / 10</span>
                <span>Score : {correct} / 10</span>
                <Box padding='4' bg='#ABD6DFFF' color='black' maxW='md'>
                    {state[count].question}
                </Box>

                {answers.map((ans,index)=>{
                    return <Box padding='4' bg='#ABD6DFFF' color='black' maxW='md' w={400} key={index}>
                        {click ? <Button colorScheme='teal' variant='outline' w={400} onClick={(e)=>correction(e)} value={index} disabled>
                            {ans}
                        </Button>:<Button colorScheme='teal' variant='outline' w={400} onClick={(e)=>correction(e)} value={index}>
                                {ans}
                            </Button>}

                        {status == index && status == arrindex?<Alert status='success'>
                            <AlertIcon />
                            Correct
                        </Alert> : status == index ? <Alert status='error'>
                            <AlertIcon />
                            Incorrect
                        </Alert>:<></>}

                    </Box>
                })
                }

                <Box padding='4' bg='#E7EBE0FF' color='black' maxW='md' ml='5'>
                    <Flex>
                        <Button colorScheme='teal' variant='outline' width={100} onClick={prev}>
                            Previous
                        </Button>
                        <Spacer width={180}/>
                        <Button colorScheme='teal' variant='outline' width={100} onClick={next}>
                            Next
                        </Button>
                    </Flex>

                </Box>
            </Container>

        }

    </div>)

}


export default Quiz