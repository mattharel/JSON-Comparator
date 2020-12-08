/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Number = {
  ONE_MILLION: 1000000,
  ONE_HUNDRED_THOUSAND: 100000,
  FIVE_HUNDRED_THOUSAND: 500000,
  RANDOM_STRING_LENGTH: 14,
  GRAPH_PERCENTAGE_STEP: 1,
};
export const Description = {
  b_arr_str_low:
    "Creating array of 100 000 random strings that are 14 chars long",
  b_arr_str_high:
    "Creating array of 1 000 000 random strings that are 14 chars long",
  b_arr_int_for: "Creating array of 1 000 000 random int with a for loop",
  b_arr_int_fill: "Creating array of 1 000 000 identical int with array fill",
  /* b_asso_array:
    "Creating associative array of 500 000 int with key strings that are 14 chars long",
  b_obj:
    "Creating 100 000 objects with 7 properties (3 Strings that are 14 chars long and int) and dynamically add one string property to each that are 14 chars long",
  b_search_dict:
    "Creating associative array of 500 000 int with key strings that are 14 chars long and searching each one and sending back an array of every value",
    */
};
/**
 * @return {*}
 */
function currentMemory() {
  if ("memory" in performance) {
    return performance.memory.usedJSHeapSize;
  } else return NaN;
}
/**
 *
 * @param {*} data
 * @return {*} adjusted memory
 */
function memoryAnalyzer(data) {
  let previousMemory = data[0].usedJSHeapSize;
  let currentMemory;
  let totalMemory = 0;
  let numberOfGarbageCollection = 0;
  for (let i = 1; i < data.length; i++) {
    currentMemory = data[i].usedJSHeapSize;
    if (currentMemory >= previousMemory)
      totalMemory += currentMemory - previousMemory;
    else numberOfGarbageCollection++;
    previousMemory = currentMemory;
  }
  const meanMemoryByStep =
    totalMemory / (data.length - numberOfGarbageCollection);
  const adujestedTotalMemory =
    totalMemory + meanMemoryByStep * numberOfGarbageCollection;
  console.log({ totalMemory });
  console.log({ adujestedTotalMemory });
  return adujestedTotalMemory;
}
/**
 *
 * @param {*} length
 * @return {*} random string from alplanumeric chars of length char
 */
function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const strongRng = new Int32Array(length);
  window.crypto.getRandomValues(strongRng);
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.abs(strongRng[i]) % charactersLength);
  }
  return result;
}

/**
 * "Creating array of 1 000 000 identical int with array fill"
 * @return {*} a tab filled with ONE strong random number, ONE MILLION TIME
 */
function b_arr_int_fill() {
  const memoryBefore = currentMemory();
  const memorySave = [];
  const tab = new Int32Array(Number.ONE_MILLION);
  const strongRng = new Int32Array(1);
  window.crypto.getRandomValues(strongRng);
  tab.fill(strongRng[0]);
  for (
    let index = 0;
    index < Math.floor(100 / Number.GRAPH_PERCENTAGE_STEP);
    index++
  ) {
    memorySave.push({
      name: index,
      usedJSHeapSize: currentMemory() - memoryBefore,
    });
  }
  return [currentMemory() - memoryBefore, memorySave];
}
/**
 * "Creating array of 1 000 000 identical int with a for loop"
 * @return {*} a tab filled with ONE MILLION strong random number, ONE MILLION TIME
 */
function b_arr_int_for() {
  const memoryBefore = currentMemory();
  const memorySave = [];
  const tab = new Int32Array(Number.ONE_MILLION);
  for (let index = 0; index < Number.ONE_MILLION; index++) {
    if ((index / Number.ONE_MILLION) * 100 >= memorySave.length)
      memorySave.push({
        name: index,
        usedJSHeapSize: currentMemory(),
      });
    const strongRng = new Int32Array(1);
    window.crypto.getRandomValues(strongRng);
    tab[index] = strongRng[0];
  }
  return [currentMemory() - memoryBefore, memorySave];
}
/**
 * Creating array of 100 000 random strings that are 14 chars long
 * @return {*} a tab filled with 100 000 random strings that are 14 chars long
 */
function b_arr_str_low() {
  const memoryBefore = currentMemory();
  const memorySave = [];
  const tab = [];
  for (let index = 0; index < Number.ONE_HUNDRED_THOUSAND; index++) {
    if ((index / Number.ONE_HUNDRED_THOUSAND) * 100 >= memorySave.length)
      memorySave.push({
        name: index,
        usedJSHeapSize: currentMemory(),
      });
    tab[index] = randomString(Number.RANDOM_STRING_LENGTH);
  }
  return [currentMemory() - memoryBefore, memorySave];
}
/**
 * Creating array of 1 000 000 random strings that are 14 chars long
 * @return {*} a tab filled with 1 000 000 random strings that are 14 chars long
 */
function b_arr_str_high() {
  const memoryBefore = currentMemory();
  const memorySave = [];
  const tab = [];
  for (let index = 0; index < Number.ONE_MILLION; index++) {
    if ((index / Number.ONE_MILLION) * 100 >= memorySave.length)
      memorySave.push({
        name: index,
        usedJSHeapSize: currentMemory(),
      });
    tab[index] = randomString(Number.RANDOM_STRING_LENGTH);
  }
  return [currentMemory() - memoryBefore, memorySave];
}

/**
 * @param {*} functionToBench list of string that contains id of the function to bench
 * @return {*} bench info, id, time, size, description
 */
export function bench(functionToBench) {
  const memoryBefore = currentMemory();
  const timeBefore = performance.now();
  let memoryUsed;
  let data;
  // BENCH HERE
  switch (functionToBench) {
    case "b_arr_str_low":
      [memoryUsed, data] = b_arr_str_low();
      memoryUsed = memoryAnalyzer(data);
      break;
    case "b_arr_str_high":
      [memoryUsed, data] = b_arr_str_high();
      memoryUsed = memoryAnalyzer(data);
      break;
    case "b_arr_int_for":
      [memoryUsed, data] = b_arr_int_for();
      memoryUsed = memoryAnalyzer(data);
      break;
    case "b_arr_int_fill":
      [memoryUsed, data] = b_arr_int_fill();
      memoryUsed = memoryAnalyzer(data);
      break;

    default:
      break;
  }
  //
  const timeEllapsed = performance.now() - timeBefore;
  return {
    description: Description[functionToBench],
    time: Math.round(timeEllapsed * 1000000),
    size: memoryUsed,
    id: functionToBench,
    data: data,
  };
}
/**
 * @return {*} platform information, creation date and units used
 */
export function benchInfo() {
  const time = new Date().toISOString();
  const platform = {
    type: "JS on " + navigator.appCodeName,
    OS: navigator.platform,
    uname: navigator.userAgent,
    version: navigator.appVersion,
  };
  const unit = {
    size: "octet",
    time: "nanosecond",
  };
  return {
    time: time,
    platform: platform,
    unit: unit,
    bench: [],
  };
}
