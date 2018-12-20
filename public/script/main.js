console.log('Im lesining')

var ctx = document.getElementById("myChart");

var labels = document.getElementById("labels").innerHTML;
var data = document.getElementById("data").innerHTML;
// function that requests data from the server
// console.log()
// console.log()

var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        // labels: ["mas", "see","too" ,"lio", "food"],
        labels: labels.split(','),
        datasets: [{
            label: '# of Votes',
            // data: [100,55,3,5,7], // insert the data from the request here ajax
            data: (data.split(',')),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        // animation: {
        //     onProgress: function (animation) {
        //         progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps
        //     }
        // },

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]

        }
    }
}

);



function move2() {
    var bar = document.getElementsByClassName("bar").innerHTML
    var budget = document.getElementById("budget").innerHTML
    console.log(budget)
    var elem = document.getElementById("myBar");
    var dataa = document.getElementById("data").innerHTML
    console.log(dataa)
    var datajoin = (dataa.split(','));

    var number = 0;
    var total = 0;
    for (var i = 0; i < datajoin.length; i++) {
        number = Number(datajoin[i])
        total += number;
    }
    console.log(total)


    var budgetper = (total / budget) * 100
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= budgetper) {
            clearInterval(id);
        } else {
            width++;
            console.log(width);
            elem.style.width = width + '%'
        }
    }
}
console.log(move2())
move2();

function beCarful() {
    if ((budgetper % 90) >= 4)
        console.log(budgetper)
    bar.style.backgroundColor = '#f8e94f';

}


function myFunction() {
    var elmnt = document.getElementsByClassName("labeleinput")[0];
    var cln = elmnt.cloneNode(true);
    document.body.appendChild(cln);
}


var datac = document.querySelectorAll("#data");

datac.forEach(function (elm) {
    elm.addEventListener("change", function () {
          elm.setAttribute('value', elm.value);
          // console.log(elm.getAttribute("name"))
          console.log(elm.value);
          var newData = Array.from(datac).map(function (newElm) {
                return parseInt(newElm.value)
          })


          document.getElementById("newData").value = newData

    })
})
var label = document.querySelectorAll("#labels");

label.forEach(function (str) {
   
    str.addEventListener("change", function () {
          console.log("change" , str.value); 
          str.setAttribute('value', str.value);
          
          var newlabel = Array.from(label).map(function (newlabel) {
                return newlabel.value
          })

          document.getElementById("newLabel").value = newlabel

    })
})