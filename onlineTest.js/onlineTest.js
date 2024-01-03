    var btn = document.getElementById("btn")
    var restart = document.getElementById("restart")
    var table = document.getElementsByClassName("resultTable")[0]
    var container = document.getElementsByClassName("container")[0]
    table.style.display = "none"



    var testArray = []

    var userResponse = []


    var feed = document.getElementById("de")
    var results = document.getElementById("results")
    var result = document.getElementById("result")
    var loading = document.getElementById("loading")
    var quizpage = document.getElementById("ner")
    var opt = document.getElementsByClassName("opt")
    var srn = document.getElementById("sr").innerHTML
    var quizline = document.getElementById("quizline")
    var next = document.getElementById("next");
    var radios = document.getElementsByName("option");
    var quizes = document.getElementsByClassName("quizes")
    var submitButton = document.getElementsByClassName("btn")[0]


    quizline.style.display = "block"
    quizpage.style.display = "block"

    function newFun() {

      commonFun(num + 1);
      console.log(num)
    }



    function backFun() {

      commonFun(num - 1);
    }
    var num = 0
    function commonFun(v) {
      num = v

      results.style.display = "none"



     // document.getElementById("sr").innerHTML = num
      document.getElementById("demo").innerHTML =JSON.parse(testArray[num-1].question.id[8])+1+"."+testArray[num - 1].question.body
      document.getElementById("de").style.color = "green"
      document.getElementById("de").style.display = "block"



      for (var i = 0; i < opt.length; i++) {
        opt[i].style.color = "black"
      }
      opt[0].innerHTML = testArray[num - 1].options.op1.id[7] + "." + testArray[num - 1].options.op1.body
      opt[1].innerHTML = testArray[num - 1].options.op2.id[7] + "." + testArray[num - 1].options.op2.body
      opt[2].innerHTML = testArray[num - 1].options.op3.id[7] + "." + testArray[num - 1].options.op3.body
      opt[3].innerHTML = testArray[num - 1].options.op4.id[7] + "." + testArray[num - 1].options.op4.body



      quizpage.style.display = "inline-block"
      feed.innerHTML = ""
      radiosCommon();
      displayPro();
    }
    function displayPro() {


      next.style.display = "inline-block"
      back.style.display = "inline-block"
      console.log(num + 1 + ":" + testArray.length)
      if (num == testArray.length) {



        next.style.display = "none"

        back.style.display = "inline-block"
      }



      if (num == "1") {
        back.style.display = "none"
        next.style.display = "inline-block"
      }

    }
    var check = ""
    function selectOp(op) {


      var quizes = document.getElementsByClassName("quizes")
      console.log(num)
      quizes[num - 1].style.color = "orange"
      var num_of_radios = radios.length;
      for (var i = 0; i < num_of_radios; i++) {
        if (radios[i].checked) {
          let selectedOpt = opt[i].innerHTML[0]
          let selectedAnswer = opt[i].innerHTML


          console.log(selectedOpt)

          if (selectedOpt == testArray[num - 1].correctOptionId) {

            check = "correct"
          }
          if (selectedOpt == testArray[num - 1].correctOptionId == false) {
            check = "wrong"
          }

          userResponse[num - 1] = { "questionId": testArray[num - 1].question.id, "selectedAnswer": selectedAnswer, "selectOptionId": selectedOpt, "status": check }
        }

      }

      console.log(userResponse)
      console.log(testArray)

      check = ""

      feed.style.display = "block"
      feed.innerHTML = "Selected"

    }
    var submitQuize = document.getElementById("submitQuize")
    function checkResult() {
      container.style.display = "none"
      submitButton.style.display = "none"
      let correct = userResponse.filter(userResponse => userResponse.status == "correct");
      for (let i = 0; i < correct.length; i++) {
        console.log(correct.length)
      };
      let inCorrect = userResponse.filter(userResponse => userResponse.status == "wrong");
      for (let i = 0; i < inCorrect.length; i++) {
        console.log(inCorrect.length + "yee")
      };
      let left = testArray.length - (correct.length + inCorrect.length)
      console.log(left + "left")



      results.style.display = "block"
      num = 0
      document.getElementById("co").innerHTML = correct.length
      document.getElementById("wr").innerHTML = inCorrect.length
      document.getElementById("unattempted").innerHTML = left
      var total = correct.length - (inCorrect.length / 3)
      document.getElementById("Om").innerHTML = Math.round(total * 100) / 100
      var per = (total / testArray.length) * 100
      document.getElementById("per").innerHTML = Math.round(per * 100) / 100 + "%"
      back.style.display = "none"
      next.style.display = "none"
      var table = document.getElementsByClassName("resultTable")[0]
      table.style.display = "block"
      for (var t = 0; t < testArray.length; t++) {
        if (userResponse[t].selectOptionId == "5") {
          userResponse[t] = { "questionId": testArray[t].question.id, "selectedAnswer": "Unattempted", "selectOptionId": "N/A", "status": "left" }

        }
        document.getElementById("anskey").innerHTML += `<tr> <td>${(t + 1)}.${testArray[t].question.body}</td>
 <td>${testArray[t].correctOptionId}</td>
 <td>${userResponse[t].selectOptionId}</td>
 <td>${userResponse[t].selectedAnswer.slice(2,30)}</td>
 
 <td>${userResponse[t].status}</td></tr>`
      }

      restart.style.display = "inline-block"
      var td=document.getElementsByTagName("td")
      for(var i=0;i,td.length;i++){
        if(i==1){
            
            td[i].style.background="skyblue"
            td[i+5].style.background="skyblue"
            td[i+10].style.background="skyblue"
            td[i+15].style.background="skyblue"
            td[i+20].style.background="skyblue"
            td[i+25].style.background="skyblue"
        }
        if(td[i].innerHTML=="wrong"){
            td[i].style.color="red"
            td[i].innerHTML="&#10060"
             
            td[i-4].style.color="red"

        }
        if(td[i].innerHTML=="correct"){
            td[i].style.color="green"
            td[i].innerHTML="&#10004"
            td[i-4].style.color="green"
        }
        if(td[i].innerHTML=="left"){
            td[i].style.color="yellow"
            td[i-4].style.color="yellow"

        }
      }

    }

    async function test() {

      const responce = await fetch("https://654f6363358230d8f0cd4325.mockapi.io/content/person")
      const student = responce.json();
      return student;
    }
    test().then((res) => {
      var js = [JSON.stringify(res)];
      var test = JSON.parse(js);



      for (var i = 0; i < test.length; i++) {



        testArray[i] = {
          question: {
            id: 'question' + i,
            body: test[i].Quize
          },
          options: {
            op1: {
              id: 'option' + i + '1',
              body: test[i].op1
            },
            op2: {
              id: 'option' + i + '2',
              body: test[i].op2
            },
            op3: {
              id: 'option' + i + '3',
              body: test[i].op3
            },
            op4: {
              id: 'option' + i + '4',
              body: test[i].op4
            }
          },
          correctOptionId: test[i].correctAnswerId
          };
         document.getElementById("quizline").innerHTML += `<div class="quizes" data="${i}">${i + 1}.${test[i].Quize}</div>`
}
      var quizes = document.getElementsByClassName("quizes")

      for (var a = 0; a < quizes.length; a++) {
        quizes[a].onclick = function () {

          var data = this.getAttributeNode("data").value

          click = JSON.parse(data) + 1
          commonFun(click);

        }
        loading.style.display = "none"

        

          

       }
      for (var i = 0; i < testArray.length; i++) {
      // userResponse[i] = { "questionId": testArray[i].question.id, "selectedAnswer": "Unattempted", "selectOptionId": "5", "status": "left" }

      }
      commonFun(1);
    }).catch((err) => { alert(err) }); 

    function radiosCommon() {
      console.log(userResponse)
      for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
      }
      
      if(userResponse[num-1]==undefined){
        radios.checked=false}
        else{

     radios[userResponse[num - 1].selectOptionId - 1].checked = "true"
      }
    }

    function reload() {
      location.reload();
    }