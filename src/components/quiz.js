import React, {useEffect} from "react";
import axios from "axios";
import {
    Container,
    Box,
    Stack,
    Button,
    Flex,
    Spacer,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle
} from '@chakra-ui/react'


const Quiz=()=>{
    const [state,setState] = React.useState([])
    const [count,setCount] = React.useState(0);
    const [correct,setCorrect] = React.useState(0);
    const [status,setStatus] = React.useState(null)
    const [click,setClick] = React.useState(false);
    const [question,setQuestion] = React.useState('');
    const [answer,setAnswer] = React.useState([]);
    const [correctans,setCorrectans] = React.useState('');
    const [alerting,setAlert] = React.useState(false)
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
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
        if(data.target.value == correctans){
            setCorrect(correct+1)
        }
    }
    const next=()=>{
        if(count < 10){
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
    useEffect(()=>{
        if(state.length > 0 && count <10){
            let answers =[]
            let correct_ans = state[count].correct_answer;
            answers = [...state[count].incorrect_answers,correct_ans];
            setAnswer(shuffle(answers))
            setCorrectans(correct_ans)
            setQuestion(state[count].question)

        }
    },[count,state])
    console.log(count)
    return(<div>

        {state.length > 0 && count <10 &&
            <Container maxW='3xl' bg='#ABD6DFFF' centerContent>
                <span>{count+1} / 10</span>
                <span>Score : {correct} / 10</span>
                <Box padding='4' bg='#ABD6DFFF' color='black' maxW='md'>
                    {question}
                </Box>

                {answer.map((ans,index)=>{
                    return <Box padding='4' bg='#ABD6DFFF' color='black' maxW='md' w={400} key={index}>
                        {click ? <Button colorScheme='teal' variant='outline' w={400} onClick={(e)=>correction(e)} disabled>
                            {ans}
                        </Button>:<Button colorScheme='teal' variant='outline' w={400} onClick={(e)=>correction(e)} value={ans}>
                                {ans}
                            </Button>}
                        {status == correctans && status == ans?<Alert status='success'>
                            <AlertIcon />
                            Correct
                        </Alert> : status == ans ? <Alert status='error'>
                            <AlertIcon />
                            Incorrect
                        </Alert>:<></>}

                    </Box>
                })}


                <Box padding='4' bg='#E7EBE0FF' color='black' maxW='md' ml='5'>
                    <Flex>
                        <Button colorScheme='teal' variant='outline' width={100} onClick={prev}>
                            Previous
                        </Button>
                        <Spacer width={180}/>

                        {count <9 ?<Button colorScheme='teal' variant='outline' width={100} onClick={next}>
                            Next
                        </Button> :<Button colorScheme='teal' variant='outline' width={100} onClick={()=>setAlert(true)}>
                            Finish
                        </Button>}
                    </Flex>

                </Box>
                {alerting ?
                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            You Have Answered All Question!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            You got {correct} out of 10
                        </AlertDescription>
                    </Alert> : <></>
                }
            </Container>

        }

    </div>)

}


export default Quiz