//alert('test');
var x = document.getElementsByClassName("qtext");
var queryQuestion = x[0].innerHTML; 

//var radio = document.getElementsByClassName("r1");
//setCorrect(radio[1]);
//setIncorrect(radio[0]);

var xmlData = readXML();
var record = findAnswerRecord(queryQuestion,xmlData);

var question = record.getElementsByTagName("question")[0].firstChild.data;
var answer = record.getElementsByTagName("Correct")[0].firstChild.data;
var incorrent1 = record.getElementsByTagName("Incorrect1")[0].firstChild.data;
console.log(question);
console.log(answer);
console.log(incorrent1);

var answerlabel = findAnswerElem(answer);
setCorrect(answerlabel);
var incorrectlabel = findAnswerElem(answer);
setIncorrect(incorrectlabel);

function setCorrect(element)
{
    element.className +=" correct";
    element.innerHTML += '<img src="https://online-edu.mirea.ru/theme/image.php/essential/core/1539516566/i/grade_correct" alt="Верно" class="questioncorrectnessicon">';
}

function setIncorrect(element)
{
    element.className +=" incorrect";
    element.innerHTML += '<img src="https://online-edu.mirea.ru/theme/image.php/essential/core/1539516566/i/grade_incorrect" alt="Неверно" class="questioncorrectnessicon">';
}

function readXML()
{
    var xml = new XMLHttpRequest();
    xml.open('GET','https://raw.githubusercontent.com/Alword/MireaTests/master/Answers.xml',false);
    xml.send();
    var xmlData = xml.responseXML;
    if(!xmlData)
    {

        xmlData = (new DOMParser()).parseFromString(xml.responseText,'text/html');
        return xmlData;
        
    }
}

function findAnswerRecord(queryQuestion, xmlData)
{
    console.log("Вопрос:"+queryQuestion);

    var questions = xmlData.getElementsByTagName("question");
    
    var i = 0;
    while(i++ < questions.length)
    {
        var question = questions[i].firstChild.data; 
        if(queryQuestion == question)
        {
            return questions[i].parentNode;
        }
    }
}

function findAnswerElem(queryAnswer)
{
    var answerelement = document.getElementsByClassName("answer")[0];
    var labels = answerelement.getElementsByTagName("label")[0];
    for(var i = 0; i<labels.length;i++)
    {
        if(labels[i].innerHTML == queryAnswer)
        return labels[i];
    }
}