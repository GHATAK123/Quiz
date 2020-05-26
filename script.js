const questionText=document.querySelector(".question-text");
const optionBox=document.querySelector(".option-box");
const currentQuestionNum=document.querySelector(".correct-question-num");
let questionIndex=0;
const correctAnswer=document.querySelector(".correct-answer");
const seeResultBtn=document.querySelector(".see-result-btn");
const remainingTime =document.querySelector(".remaining-time");
const nextQuestionBtn=document.querySelector(".next-question-btn");
const timeUpText=document.querySelector(".time-up-text");
const quizBox=document.querySelector(".quiz-box");
let number=0;
let score=0;
let interval;




myApp=[
    
    
    
    {
        question:"What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
        options:["strip()","trim()","join()","split()"],
        answer:1

    },
    
   
    {
        question:"Which input type defines a slider control?",
        options:["range","search","slider","controls"],
        answer:0
    },
    {
        question:"In HTML, which attribute is used to specify that an input field must be filled out?",
        options:["validate","formvalidate","required","placeholder"],
        answer:2
    },
    {
        question:"What does CSS stand for?",
        options:["Cascading Style Sheets ","Colorful Style Sheets","Creative Style Sheets","Computer Style Sheets"],
        answer:0
    },
    {
        question:"Which CSS property controls the text size?",
        options:["text-size","font-style","text-style","font-size"],
        answer:3
    },
    {
        question:"How do you make each word in a text start with a capital letter?",
        options:["text-style:capitalize","transform:capitalize","text-transform:capitalize","You can't do that with CSS"],
        answer:2
    },
    {
        question:"Which HTML attribute is used to define inline styles?",
        options:["font","styles","style","class"],
        answer:2
    },
    {
        question:"In how many ways a JavaScript code can be involved in an HTML file?",
        options:["1","2","3","4"],
        answer:2
    }


      ];

    function load() {
        number++;
        questionText.innerHTML=myApp[questionIndex].question;
        createOptions();
        scoreBoard();
        currentQuestionNum.innerHTML=number+ " / " + myApp.length;
        

    }
    function createOptions() {
        optionBox.innerHTML="";
        let animationDelay=0.2;
        for(let i=0;i<myApp[questionIndex].options.length;i++)
        {
            const option=document.createElement("div");
                option.innerHTML=myApp[questionIndex].options[i];
                option.classList.add("option");
                option.id=i;
                option.style.animationDelay=animationDelay+"s";
                animationDelay=animationDelay+0.2;
                option.setAttribute("onClick","check(this)");
                optionBox.appendChild(option);
            
        }   
    }

   
    function check(ele) {
        const id=ele.id;
        if(id==myApp[questionIndex].answer) {
            ele.classList.add("correct");
            score++;
            scoreBoard();
        }
        else {
            ele.classList.add("wrong");
            for(let i=0;i<optionBox.children.length;i++){
                if(optionBox.children[i].id==myApp[questionIndex].answer){
                    optionBox.children[i].classList.add("show-correct");
                }

            }

        }

        disableOptions();    
        showNextQuestionBtn();
        stopTimer();
        if(number==myApp.length)
        {
            quizOver();
        }
                
            
        
    }

    function startTimer(){
        let timeLimit=15;
        remainingTime.innerHTML=timeLimit;
        remainingTime.classList.remove("less-time");
        interval=setInterval( () => {
            timeLimit--;
            if(timeLimit<10){
                timeLimit="0"+timeLimit;
            }
            if(timeLimit<6){
                remainingTime.classList.add("less-time");
            }
            remainingTime.innerHTML=timeLimit;
            if(timeLimit==0){
                clearInterval(interval);
                timeIsUp();
            }

            
        },1000)



    }

    function stopTimer(){
        clearInterval(interval);
    }

    function timeIsUp() {
        showTimeUpText();
        for(let i=0;i<optionBox.children.length;i++){
            if(optionBox.children[i].id==myApp[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct");
            }

        }

        disableOptions();    
        showNextQuestionBtn();

    }

    
    function disableOptions() {
        for (let i = 0; i < optionBox.children.length; i++) {
            optionBox.children[i].classList.add("already-answered");
            
        }


    }
    function showNextQuestionBtn()
    {
        nextQuestionBtn.classList.add("show");

    }

    function hideNextQuestionBtn()
    {
        nextQuestionBtn.classList.remove("show");

    }

    function showTimeUpText() {
        timeUpText.classList.add("show");
    }
    function hideTimeUpText() {
        timeUpText.classList.remove("show");
    }

    function scoreBoard() {
        correctAnswer.innerHTML=score;
    }

    nextQuestionBtn.addEventListener("click",nextQuestion);

    function nextQuestion() {
        questionIndex++;
        load();
        hideNextQuestionBtn();
        hideTimeUpText();
        startTimer();s
        

    }

    function quizOver () {
        nextQuestionBtn.classList.remove("show");
        seeResultBtn.classList.add("show");

    }

    seeResultBtn.addEventListener("click",() => {
        
    })
    window.onload=() => {
        startTimer();
        load();
        
    }
      
