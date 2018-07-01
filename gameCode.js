function initialized()
{
  document.getElementById("yay").volume = .4;
  document.getElementById("nice").volume = .6;
  document.getElementById("wrong").volume = .4;
  document.getElementById("excellent").volume = .4;

  score = 0;
  level = 1;
  goal = 10;
  fruitChoices = 3; // constant: number of fruit images I have
  numOfAnswers = 4;
  minFruitCount = 1;
  maxFruitCount = 9;
  same = true;
  fruitCon = document.getElementById("fruitConId");
  answersCon = document.getElementById("answersConId");
  displayFruit(minFruitCount,maxFruitCount);
  getAnswers();

}

function displayFruit(min,max) //add fruit images to screen
{
  fruitCon.style.top = "30%"
  numOfFruit = getRanNum(min,max);
  var fruitType = getRanNum(0,fruitChoices);
  for(x=0;x<numOfFruit;x++)
  {
    var fruit = document.createElement("img");
    fruit.src = "images/"+fruitType+".png";
    fruit.className = "fruits"
    fruitCon.appendChild(fruit);
  }
}
function getAnswers()
{
  answersCon.style.top = "30%"
  var answers = [];
  for(x=0;x<numOfAnswers;x++)
  {
    same = true;
    while(same == true)
    {
      newNum = getRanNum(minFruitCount,maxFruitCount);
      same = false;
      for(i=0;i<=answers.length;i++)
      {
        if(newNum==answers[i] || newNum==numOfFruit)
        {
          same = true;
        }
      }
    }
    answers.push(newNum);
  }
  answers.splice(getRanNum(0,answers.length-1),0,numOfFruit);
  for(x=0;x<numOfAnswers+1;x++) // display the answers randomly
  {

    var choice = document.createElement("span");
    var number = document.createTextNode(answers[0]);
   if(answers[0]== numOfFruit)
    {
      choice.setAttribute("id", "correct");
    }
    choice.className = "answers";
    choice.onclick = checkAnswer;
    answers.splice(0,1);
    choice.appendChild(number);
    answersCon.appendChild(choice);
  }
}
function checkAnswer()
{
  if(this.id == "correct")
  {
    score++;

    if(score>=goal && level == "final")
    {
        fruitCon.style.visibility = "hidden";
        answersCon.style.visibility = "hidden";
        document.getElementById("excellent").play();
        document.getElementById("won").style.visibility = "visible";
        setTimeout(function (){document.getElementById("end").play();},3000);
        dance();
      return;
    }
    if(score!=goal)
    {

      document.getElementById("yay").play();
      setTimeout(function (){document.getElementById("nice").play();},1300);
      document.getElementById("scoreId").innerHTML = score;
      done();
    }
    if(score>=goal)
    {
      level++;
      score = 0;
      maxFruitCount=maxFruitCount+3;
      minFruitCount = minFruitCount+3;
      if(level>=3)
      {
        level = "final";
      }
      document.getElementById("right").play();
      setTimeout(function (){document.getElementById("nice").play();},1000);
      nextlvl();
      done();
      document.getElementById("levelId").innerHTML = level;
      document.getElementById("scoreId").innerHTML = score;

    }
  }
    else{
    document.getElementById("wrong").play();}
  }


function getRanNum (lower, upper)
{
  if (lower < upper || lower == upper)
  {
    var num = parseInt(Math.random() * ((upper + 1) - lower)+lower);
    return num;
  }
  else
  {
    return null;
  }
}

function done(lvl)
{
  goDown();
  setTimeout(function (){while (fruitCon.firstChild) {
      fruitCon.removeChild(fruitCon.firstChild);
  }
  while (answersCon.firstChild) {
      answersCon.removeChild(answersCon.firstChild);
  }},2000);

  setTimeout(function (){
  displayFruit(minFruitCount,maxFruitCount);
  getAnswers();},2000);

}
function goDown()
{
  $("#fruitConId").animate({
    top:'120%',
  },1000);
  setTimeout(function (){$("#answersConId").animate({
    top:'120%',
  },1000);},800);
};

function dance()
{
  $("#won").animate({
    visibility:'visible',
    top:'40%',
  },1000);
};
 function nextlvl()
 {
   $("#levelId").animate({
     fontSize:'70px',
   },500);
   $("#levelId").animate({
     fontSize:'40px',
   },500);
 };
