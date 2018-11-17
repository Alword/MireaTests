var x = document.getElementsByClassName("qtext");
var queryQuestion = x[0].innerHTML; 

var xmlData = readXML();
var record = findAnswerRecord(queryQuestion,xmlData);


var question = record.getElementsByTagName("question")[0].firstChild.data;
console.log(question);

if(record.getElementsByTagName("Correct")[0] != null)
{
    var answer = record.getElementsByTagName("Correct")[0].firstChild.data;
    console.log(answer);
    var answerlabel = findAnswerElem(answer);
    setCorrect(answerlabel);
}

if(record.getElementsByTagName("Incorrect1")[0] != null)
{
    var incorrent1 = record.getElementsByTagName("Incorrect1")[0].firstChild.data;
    console.log(incorrent1);
    var incorrectlabel = findAnswerElem(incorrent1);
    setIncorrect(incorrectlabel);
}


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
    
    var j = 0;
    while(j++ < questions.length)
    {
        var question = questions[j].firstChild.data; 
        if(queryQuestion == question)
        {
            console.log("Вопрос:"+question);
            return questions[j].parentNode;
        }
    }
}

function findAnswerElem(queryAnswer)
{
    var answerelement = document.getElementsByClassName("answer")[0];
    var labels = answerelement.getElementsByTagName("label");
    for(var i = 0; i<labels.length;i++)
    {
        if(labels[i].innerHTML.endsWith(queryAnswer))
        return labels[i];
    }
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};