/*
Named tuple elements document what each position means (they show up in your editor).
Elements can also be optional (?) or a rest (...).
*/

const coordinates: [x: number, y: number] = [55.2, 41.3];
console.log(coordinates);

type HttpResponse = [status: number, body: string, headers?: Record<string, string>];
const ok: HttpResponse = [200, "OK"];
const created: HttpResponse = [201, "Created", { location: "/items/1" }];
console.log(ok.length, created[2]?.location); // 2 /items/1

type NameAndScores = [name: string, ...scores: number[]];
const asha: NameAndScores = ["Asha", 90, 85, 77];
console.log(asha);
