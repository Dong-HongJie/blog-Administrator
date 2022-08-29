function serializeToJson(form) {
  let arr = form.serializeArray(),
    result = {};
  arr.forEach((item) => {
    result[item.name] = item.value;
  });
  return result;
}
