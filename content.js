//alert('test');
var x = document.getElementsByClassName("qtext");
console.log(x[0].innerHTML);
var radio = document.getElementsByClassName("r1");
setCorrect(radio[1]);
setIncorrect(radio[0]);
readXML()

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
    xml.open('GET','/Answers.xml',false);
    xml.send();
    var xmlData = xml.responseXML;
    if(!xmlData)
    {
        xmlData = (new DOMParser()).parseFromString(xml.responseText,'text/html');
        var questions = xmlData.getElementsByTagName("question");
        console.log(questions[0].firstChild.data);
    }
}