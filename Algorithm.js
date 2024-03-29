let processes = [];

function createInputFields() {
    let numProcesses = document.getElementById('numProcesses').value;
    let processInputs = document.getElementById('processInputs');
    processInputs.innerHTML = '';

    let inputFieldHTML = '<table id="inputTable">';
    inputFieldHTML += '<tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th></tr>';
    for (let i = 0; i < numProcesses; i++) {
        inputFieldHTML += `
            <tr>
                <td>Process ${i+1}</td>
                <td><input type="number" id="arrivalTime${i}" class="time-input" min="0"></td>
                <td><input type="number" id="burstTime${i}" class="time-input" min="1"></td>
            </tr>
        `;
    }
    inputFieldHTML += '</table>';
    processInputs.innerHTML = inputFieldHTML;
    
    document.getElementById('calculateButton').style.display = 'block';
}

function calculateTimes() {
    let numProcesses = document.getElementById('numProcesses').value;
    if (numProcesses) {
        let allInputsFilled = true;
        for (let i = 0; i < numProcesses; i++) {
            let arrivalTime = document.getElementById(`arrivalTime${i}`).value;
            let burstTime = document.getElementById(`burstTime${i}`).value;
            if (arrivalTime.trim() === '' || burstTime.trim() === '') {
                allInputsFilled = false;
                break;
            }
        }
        if (allInputsFilled) {
            let totalWaitingTime = 0;
            let totalTurnAroundTime = 0;
            for (let i = 0; i < numProcesses; i++) {
                let arrivalTime = document.getElementById(`arrivalTime${i}`).value;
                let burstTime = document.getElementById(`burstTime${i}`).value;
                processes.push({arrivalTime: parseInt(arrivalTime), burstTime: parseInt(burstTime), completionTime: 0, turnAroundTime: 0, waitingTime: 0});
            }
            processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
            let currentTime = processes[0].arrivalTime;
            for (let i = 0; i < processes.length; i++) {
                if (currentTime < processes[i].arrivalTime) {
                    currentTime = processes[i].arrivalTime;
                }
                currentTime += processes[i].burstTime;
                processes[i].completionTime = currentTime;
                processes[i].turnAroundTime = processes[i].completionTime - processes[i].arrivalTime;
                processes[i].waitingTime = processes[i].turnAroundTime - processes[i].burstTime;
                totalWaitingTime += processes[i].waitingTime;
                totalTurnAroundTime += processes[i].turnAroundTime;
            }
            let avgWaitingTime = totalWaitingTime / numProcesses;
            let avgTurnAroundTime = totalTurnAroundTime / numProcesses;
            displayTable(avgWaitingTime, avgTurnAroundTime);
            createGanttChart()
        } else {
            alert("Please fill in all the input fields.");
        }
    } else {
        alert("Please enter the number of processes.");
    }
}




function calculateTimess() {
    let numProcesses = document.getElementById('numProcesses').value;
    if(numProcesses){
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;
    for (let i = 0; i < numProcesses; i++) {
        let arrivalTime = document.getElementById(`arrivalTime${i}`).value;
        let burstTime = document.getElementById(`burstTime${i}`).value;
        processes.push({arrivalTime: parseInt(arrivalTime), burstTime: parseInt(burstTime), completionTime: 0, turnAroundTime: 0, waitingTime: 0});
    }
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = processes[0].arrivalTime;
    for (let i = 0; i < processes.length; i++) {
        if (currentTime < processes[i].arrivalTime) {
            currentTime = processes[i].arrivalTime;
        }
        currentTime += processes[i].burstTime;
        processes[i].completionTime = currentTime;
        processes[i].turnAroundTime = processes[i].completionTime - processes[i].arrivalTime;
        processes[i].waitingTime = processes[i].turnAroundTime - processes[i].burstTime;
        totalWaitingTime += processes[i].waitingTime;
        totalTurnAroundTime += processes[i].turnAroundTime;
    }
    let avgWaitingTime = totalWaitingTime / numProcesses;
    let avgTurnAroundTime = totalTurnAroundTime / numProcesses;
    displayTable(avgWaitingTime, avgTurnAroundTime);
    createGanttChart()
    }
}

function displayTable(avgWaitingTime, avgTurnAroundTime) {
    let outputTable = document.getElementById('outputTable');
    let tableHTML = '<table id="outputTable">';
    tableHTML += '<tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Completion Time</th><th>Turn Around Time</th><th>Waiting Time</th></tr>';
    for (let i = 0; i < processes.length; i++) {
        tableHTML += `<tr><td>Process ${i+1}</td><td>${processes[i].arrivalTime}</td><td>${processes[i].burstTime}</td><td>${processes[i].completionTime}</td><td>${processes[i].turnAroundTime}</td><td>${processes[i].waitingTime}</td></tr>`;
    }
    tableHTML += `</table><p class="average">Average Waiting Time:   ${avgWaitingTime.toFixed(2)}</p><p class="average">Average Turn Around Time: ${avgTurnAroundTime.toFixed(2)}</p>`;
    outputTable.innerHTML = tableHTML;

}



function createGanttChart() {
    
    let ganttChart = document.getElementById('ganttChart');
    let chartHTML = '<div class="gantt">';
    let totalTime = processes.reduce((total, process) => total + process.burstTime, 0);
    let currentTime = 0;

    for (let i = 0; i < processes.length; i++) {
        let process = processes[i];
        let width = (process.burstTime / totalTime) * 130;
        chartHTML += `<div class="gantt-bar" style="width:${width}%; left:${(currentTime / totalTime) * 100}%; background-color:${getRandomColor()};">
                        <span style="white-space: nowrap;">Process ${i+1}<br>(${process.burstTime} units)</span>
                      </div>`;
        currentTime += process.burstTime;
    }
    chartHTML += '</div>';
    ganttChart.innerHTML = chartHTML;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
