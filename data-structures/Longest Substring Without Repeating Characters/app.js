// Longest Substring Without Repeating Characters

var str = "abcabcbb".split("");
const sorting = (arr) => {
    const final_data = [];
    const data = arr.filter((item, index) => arr.indexOf(item) === index);
    const stringss = data.toString()
    const result = stringss.replace(/,/g, "");
    const string_length = result.length;
    final_data.push(string_length, result)
    console.log(final_data);
}
sorting(str)  