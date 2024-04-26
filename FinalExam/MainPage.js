// MainPage.js

// Event listener for the Calculate button
document.getElementById('cmdCalculate').addEventListener('click', function() {
    calculateNumbers();
});

// Function to calculate almost prime and brilliant numbers
function calculateNumbers() {
    // Clear previous table if exists
    var output = document.getElementById('output');
    output.innerHTML = '';

    // Get user input
    var userInput = parseInt(document.getElementById('txtInput').value);

    // Validate input
    if (isNaN(userInput) || userInput <= 0) {
        // Show error message
        showError("Please enter a valid positive integer.");
        return;
    }

    // Array to store almost prime numbers
    var semiPrimes = [];

    // Array to store brilliant numbers
    var brilliantNumbers = [];

    // Loop through numbers from 1 to userInput
    for (var i = 1; i <= userInput; i++) {
        // Check if the number is almost prime
        if (isSemiPrime(i)) {
            semiPrimes.push(i);
        }

        // Check if the number is brilliant
        if (isBrilliant(i)) {
            brilliantNumbers.push(i);
        }
    }

    // Generate and display the table
    generateTable(output, userInput, semiPrimes, brilliantNumbers);
}

// Function to check if a number is semi-prime
function isSemiPrime(num) {
    let primeFactors = 0;
    for (let i = 2; i <= num; i++) {
        if (num % i === 0 && isPrime(i)) {
            primeFactors++;
            num /= i;
            i = 1; // Reset i to start checking from 2 again
        }
    }
    return primeFactors === 2;
}
/// Helper function to check if a number is prime
function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if (num % i === 0) return false;
    return num > 1;
}

// Function to check if a number is brilliant
function isBrilliant(num) {
    let factor1 = 0;
    let factor2 = 0;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0 && isPrime(i) && isPrime(num / i)) {
            factor1 = i;
            factor2 = num / i;
            break;
        }
    }

    // Check if it's semi-prime
    if (factor1 === 0 || factor2 === 0) {
        return false;
    }

    // Check if the two factors have the same number of digits
    return factor1.toString().length === factor2.toString().length;
}
// Function to generate and display the table
function generateTable(output, userInput, semiPrimes, brilliantNumbers) {
    var table = document.createElement('table');
    var counter = 1;

    for (var i = 0; i < Math.ceil(userInput / 10); i++) {
        var row = table.insertRow();
        for (var j = 0; j < 10; j++) {
            var cell = row.insertCell();
            cell.textContent = counter;

            // Apply styles based on whether it's almost prime or brilliant
            if (semiPrimes.includes(counter)) {
                cell.classList.add('semi-prime');
            }
            if (brilliantNumbers.includes(counter)) {
                cell.classList.add('brilliant');
            }

            counter++;
            if (counter > userInput) {
                break;
            }
        }
    }

    output.appendChild(table);
}

// Function to show error message
function showError(message) {
    // Create error message div
    var errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');

    // Create OK button
    var okButton = document.createElement('button');
    okButton.textContent = 'OK';
    errorMessage.appendChild(okButton);

    // Append error message to the body
    document.body.appendChild(errorMessage);

    // Event listener to remove error message when OK is clicked
    okButton.addEventListener('click', function() {
        document.body.removeChild(errorMessage);
    });
}

// Function to get results in JSON format
function getResults() {
    var semiPrimes = document.querySelectorAll('.semi-prime');
    var brilliantNumbers = document.querySelectorAll('.brilliant');
    var results = {
        "semi": [],
        "brilliant": []
    };

    semiPrimes.forEach(function(cell) {
        results.semi.push({"s": cell.textContent});
    });

    brilliantNumbers.forEach(function(cell) {
        results.brilliant.push({"b": cell.textContent});
    });

    return JSON.stringify(results);
}
