
let jsonString="{\"name\":\"Trump\",\"city\":\"NewYork\",\"marks\":[23,45,67,34]}";
let y=parseData(jsonString);
function parseData(data) {
    if (!data) return {};
    if (typeof data === 'object') return data;
    if (typeof data === 'string') return JSON.parse(data);

    return {};
}
console.log(y.marks)