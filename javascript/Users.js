// webdev ex# 2
// 
// id:322675356


let users = [
    ["fcasey", "Frederick", "Casey", "Male", "f.casey@randatmail.com", 10],
    ["nlx123", "Kirsten",	"Higgins", "Female", "k.higgins@randatmail.com", 5],
    ["gp8", "Roman", "Murphy",	"Male",	"r.murphy@randatmail.com",	26],
    ["conn_cun", "Connie", "Cunningham",	"Female", "c.cunningham@randatmail.com", 10],
    ["adison2", "Adison", "Richardson",	"Male",	"a.richardson@randatmail.com", 51],
    ["9rr", "Jessica", "Turner", "Female", "j.turner@randatmail.com", 17],
    ["turns", "Spike", "Johnston", "Male", "s.johnston@randatmail.com", 11],
    ["john87", "John", "Mates", "Male", "jm@randatmail.com", 5],
    ["apy", "Charlie", "Johnson", "Male", "c.johnson@randatmail.com", 10],
    ["cAnn", "Ann", "Cole", "Female", "a.cole@randatmail.com", 3],
    ["alanT3", "Alan",	"Thompson",	"Male",	"a.thompson@randatmail.com", 51]
];


    function getEMails() {
        return users.map(user => user[4]).sort();
    }

    function amountByGender(gender) {
        return users.filter(user => user[3] === gender).length;
    }

    function howManyLowerThan(hits) {
        return users.filter(user => user[5] < hits).length;
    }

    function groupByHits() {
        let hitsCount = {};
        users.forEach(user => {
            if (hitsCount[user[5]]) {
                hitsCount[user[5]]++;
            } else {
                hitsCount[user[5]] = 1;
            }
        });

        let groupedHits = Object.entries(hitsCount).map(([hits, amount]) => [Number(hits), amount]);
        groupedHits.sort((a, b) => b[1] - a[1]);

        return groupedHits;
    }

    function groupByGender() {
        let males = users.filter(user => user[3] === "Male");
        let females = users.filter(user => user[3] === "Female");
        return [["Male", males], ["Female", females]];
    }

  
function createFunctionOfLetter(letter) {
    return function() {
        return users.filter(user => user[1].startsWith(letter)).map(user => user[1]);
    }
}

