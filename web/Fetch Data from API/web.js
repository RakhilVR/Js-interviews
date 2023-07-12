const endpoints = [
    "https://dummyjson.com/products/1",
    "https://dummyjson.com/products/2",
    "https://dummyjson.com/products/3",
    "https://dummyjson.com/products/4",
    "https://dummyjson.com/products/5",
    "https://dummyjson.com/products/6",
    "https://dummyjson.com/products/7",
    "https://dummyjson.com/products/8",
    "https://dummyjson.com/products/9",
    "https://dummyjson.com/products/10",
    "https://dummyjson.com/products/11",
    "https://dummyjson.com/products/12",
    "https://dummyjson.com/products/13",
    "https://dummyjson.com/products/14",
    "https://dummyjson.com/products/15",
    "https://dummyjson.com/products/16",
    "https://dummyjson.com/products/17",
    "https://dummyjson.com/products/18",
    "https://dummyjson.com/products/19",
    "https://dummyjson.com/products/20"
]




const api_details = async () => {
    const responses = [];

    const apis = endpoints.map(async (item) => {
        console.log(item);
        const response = await fetch(item);
        const data = await response.json();
        responses.push(data);
        // console.log(responses);
    });

    await Promise.all(apis);

    return responses;
}

// Call the function
api_details()
    .then((responses) => {

        const final_ouput = []
        console.log("All responses:", responses);

        const titlesAndPrices = responses.map((item) => {
            return {
                title: item.title,
                price: item.price
            };
        });
        const test = titlesAndPrices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        final_ouput.push(test, {"mostExpensive":test[19]})
        console.log(final_ouput);

    })
    .catch((error) => {
        console.error("Error:", error);
    });

    const section = document.getElementById('show')
     section.innerHTML = final_ouput



