var arr = [1,2,3,4];
for (var value of arr) {
	console.log(value);
}

let a = 100;
let b = `我今年 ${a} 岁了`;
console.log(b);

//function* test(name) {
//  yield "你好 " + name + "!";
//  yield "希望你能喜欢这篇介绍ES6的译文";
//  if (name == '') {
//    yield "你的名字还没写哟";
//  }
//  yield "我们下次再见！";
//}
//var iter = test("jorendorff");
//console.log(iter);
//console.log(iter.next());

/*function* range(start, stop) {
  for (var i = start; i < stop; i++)
    yield i;
}
for (var value of range(0, 3)) {
  alert("Ding! at floor #" + value);
}*/