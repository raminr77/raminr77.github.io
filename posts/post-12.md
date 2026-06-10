---
id: 12
slug: a-simple-guide-to-the-sliding-window-algorithm
title: A Simple Guide to the Sliding Window Algorithm
description: The sliding window is one of those techniques that looks clever once you see it and obvious once you understand it. Here is the plain version, with the kind of examples that actually made it click for me.
category: Algorithm
tags:
  - algorithm
  - Interview
  - programming
  - problem solving
date: 2026-06-10
isActive: true
author: Ramin
---

The first time I saw a "sliding window" solution in an interview prep video, I nodded along and understood nothing. The code was short, the explanation was fast, and I walked away thinking it was some trick reserved for people who are good at this. It is not. It is a small idea that you can hold in your head, and once it clicks you start seeing it everywhere.

This post is the explanation I wish I had back then. No heavy notation, no proofs. We will go slow, trace the numbers by hand, and build it up from one example to the next.

## A picture first

Forget code for a second. Imagine you cut a small rectangular hole in a piece of cardboard and slide it across a line of numbers. You can only see the numbers inside the hole at any moment.

```text
numbers:  2   1   5   1   3   2
window:  [2   1   5]                  -> you see 2, 1, 5
              [1   5   1]             -> slide right by one
                  [5   1   3]         -> slide again
                      [1   3   2]     -> and again
```

That hole is the "window". It has a width, it sits on top of your data, and it moves. Every problem in this post is just a question about what you can see through that hole as it slides. That is the entire idea. The rest is bookkeeping.

## The problem it solves

Here is a real question: in this array, what is the largest sum you can get from any 3 numbers that sit next to each other?

```js
const numbers = [2, 1, 5, 1, 3, 2];
// pick 3 in a row, find the biggest sum
```

Let me solve it the slow, obvious way first, because seeing why the slow way is wasteful is the whole motivation.

```js
function maxSumSlow(numbers, windowSize) {
  let maxSum = -Infinity;

  for (let start = 0; start + windowSize <= numbers.length; start++) {
    let currentSum = 0;

    // add up the windowSize numbers starting at `start`
    for (let offset = 0; offset < windowSize; offset++) {
      currentSum += numbers[start + offset];
    }

    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

This works. But watch what it does for our array with a window of 3:

```text
start 0:  2 + 1 + 5  = 8
start 1:  1 + 5 + 1  = 7
start 2:  5 + 1 + 3  = 9
start 3:  1 + 3 + 2  = 6
answer: 9
```

Look closely at `start 0` and `start 1`. Both of them added the `1` and the `5`. We computed `1 + 5` twice for no reason. With a window of 3 that is a little waste. With a window of 1000 you would re-add almost a thousand numbers at every step, over and over. That repeated work is exactly what we are going to kill.

## The idea: reuse what you already added

When the window slides one step to the right, almost nothing changes. One number falls off the left edge, one new number enters on the right, and everything in between stays the same.

```text
[2   1   5]  1   3   2      sum = 8
 ^ leaves
 2   [1   5   1]  3   2      sum = 8 - 2 + 1 = 7
              ^ enters
```

So instead of re-adding the whole window, keep a running total and just do two operations each step:

1. subtract the number that leaves the left,
2. add the number that enters on the right.

That is the trick. Here it is in code.

```js
function maxSum(numbers, windowSize) {
  let windowSum = 0;

  // build the very first window once
  for (let index = 0; index < windowSize; index++) {
    windowSum += numbers[index];
  }

  let maxSum = windowSum;

  // now just slide: drop the left, add the right
  for (let index = windowSize; index < numbers.length; index++) {
    windowSum += numbers[index] - numbers[index - windowSize];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

Let me trace it on `[2, 1, 5, 1, 3, 2]` with `windowSize = 3` so you can see every step:

```text
first window [2,1,5]           windowSum = 8     maxSum = 8
index 3: + numbers[3]=1, - numbers[0]=2  -> 8 + 1 - 2 = 7    maxSum = 8
index 4: + numbers[4]=3, - numbers[1]=1  -> 7 + 3 - 1 = 9    maxSum = 9
index 5: + numbers[5]=2, - numbers[2]=5  -> 9 + 2 - 5 = 6    maxSum = 9
answer: 9
```

Same answer as the slow version, but notice we never add three numbers at once after the first window. Each step is just one addition and one subtraction, no matter how wide the window is. The slow version does work that grows with `array length × window size`. This one grows only with `array length`. On big inputs that gap is huge.

## Second example: average of every window

Once you have the running sum, lots of variations are basically free. Want the average temperature over every 7 days in a long list of daily readings? Same window, just divide at the end.

```js
function averagesOfEachWindow(numbers, windowSize) {
  const averages = [];
  let windowSum = 0;

  for (let index = 0; index < numbers.length; index++) {
    windowSum += numbers[index];

    // once the window is full, record an average and slide
    if (index >= windowSize - 1) {
      averages.push(windowSum / windowSize);
      windowSum -= numbers[index - windowSize + 1];
    }
  }

  return averages;
}

averagesOfEachWindow([1, 3, 2, 6, -1, 4, 1, 8, 2], 5);
// [2.2, 2.8, 2.4, 3.6, 2.8]
```

Notice the shape is identical: grow the sum, and the moment the window is full, use it and then subtract the element that is about to leave. This "build it, then slide it" rhythm is the skeleton of every fixed-window problem you will meet.

## When the window changes size

Everything so far used a **fixed** width. The window was always 3, always 5, always 7. That is the easy half.

The half that trips people up is the **variable** window, where the width is not given to you. Instead you grow the window when you can, and shrink it when you must. The two edges of the window move on their own schedule. People call this "two pointers", but it is still just our cardboard hole, only now the hole can stretch and squeeze.

Let me give you two classic examples, from simplest to slightly trickier.

### Example A: longest substring with no repeated characters

Given `"abcabcbb"`, find the length of the longest stretch with all unique characters. (Here it is `"abc"`, length 3.)

The plan in plain words, this is the part to internalize:

- Move the **right** edge forward to pull in a new character.
- If that new character is already inside the window, move the **left** edge forward, throwing characters away, until the duplicate is gone.
- After every step, the window is valid, so check if it is the longest so far.

```js
function longestUniqueSubstring(text) {
  const seen = new Set();
  let left = 0;
  let longest = 0;

  for (let right = 0; right < text.length; right++) {
    // shrink from the left until the new character is no longer a duplicate
    while (seen.has(text[right])) {
      seen.delete(text[left]);
      left++;
    }

    seen.add(text[right]);
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}
```

Trace on `"abcab"`:

```text
right=0 'a'  window "a"     longest=1
right=1 'b'  window "ab"    longest=2
right=2 'c'  window "abc"   longest=3
right=3 'a'  'a' already in window -> drop left 'a', left moves to 1
             window "bca"   longest=3
right=4 'b'  'b' already in window -> drop left 'b', left moves to 2
             window "cab"   longest=3
answer: 3
```

The `right` pointer never stops, it walks all the way across. The `left` pointer only moves when a rule is broken, and only as far as it needs to. The gap between them, `right - left + 1`, is the current window width.

### Example B: smallest window that reaches a target sum

Given positive numbers `[2, 1, 5, 2, 3, 2]` and a target `7`, find the length of the **shortest** run of numbers whose sum is at least 7.

This one flips the goal: instead of growing as much as possible, we want to grow just until we hit the target, then shrink to see how small we can make it.

```js
function shortestSubarrayWithSum(numbers, target) {
  let left = 0;
  let windowSum = 0;
  let shortest = Infinity;

  for (let right = 0; right < numbers.length; right++) {
    windowSum += numbers[right]; // grow on the right

    // as long as we already meet the target, try shrinking from the left
    while (windowSum >= target) {
      shortest = Math.min(shortest, right - left + 1);
      windowSum -= numbers[left];
      left++;
    }
  }

  return shortest === Infinity ? 0 : shortest;
}

shortestSubarrayWithSum([2, 1, 5, 2, 3, 2], 7); // 2  (the "5,2" or "3,2"... actually "5,2"=7)
```

Trace it:

```text
right=0 (+2) sum=2  below 7, keep growing
right=1 (+1) sum=3  below 7
right=2 (+5) sum=8  >= 7 -> window [2,1,5] length 3, shortest=3
                       shrink: -2, sum=6, left=1
right=3 (+2) sum=8  >= 7 -> window [1,5,2] length 3
                       shrink: -1, sum=7, window [5,2] length 2, shortest=2
                       shrink: -5, sum=2, left=3
right=4 (+3) sum=5  below 7
right=5 (+2) sum=7  >= 7 -> window [3,2] length 2, shortest=2
                       shrink: -3, sum=4, left=5
answer: 2
```

Same machinery as Example A, with the shrink condition flipped to match the goal. That is the pattern: `right` always grows the window, a `while` loop decides when `left` shrinks it.

## How to recognize when to reach for it

You do not need to memorize problem types. These problems have a smell:

- The data is linear: an array, a string, a list.
- The question is about a **contiguous** chunk, in a row, next to each other, a substring, a subarray.
- A brute force solution would scan the same elements again and again.

When those three line up, the sliding window is usually the answer. Its whole purpose is to turn repeated scanning into a cheap running update.

## The two questions that decide everything

When I get stuck on one of these, it is almost never the window itself. It is these two questions:

1. **When does the window grow?** (Usually: every step, by moving `right`.)
2. **When does the window shrink?** (When it breaks a rule, or once it satisfies a goal.)

Answer those in plain words before writing a single line. For Example A: "Grow every step. Shrink when I see a character I already have." For Example B: "Grow every step. Shrink while the sum is already big enough." Once you can say it out loud, the code almost writes itself.

## Common mistakes to watch for

- **Window width is `right - left + 1`, not `right - left`.** The `+ 1` bites everyone once.
- **Forgetting to update the running total when an element leaves.** If you add on the right but never subtract on the left, your sum just keeps growing.
- **`if` where you needed `while`.** In variable windows you often have to shrink more than one step. A single `if` only shrinks once and leaves the window invalid.
- **Negative numbers break the "shrink to shorten" trick.** The shortest-sum example relies on all numbers being positive, so that adding always grows the sum and removing always shrinks it. With negatives you need a different tool (prefix sums, for instance).

That is the sliding window. A frame, fixed or stretchy, that walks across your data and updates as it goes instead of starting over. Small idea, big payoff. Start with the fixed-window ones until the rhythm feels natural, then move to the two-pointer versions. After a handful of problems you will start spotting the window before you even finish reading the question.

## References and further reading

- [Minimum Size Subarray Sum, LeetCode #209](https://leetcode.com/problems/minimum-size-subarray-sum/)
- [Sliding Window Technique, GeeksforGeeks overview](https://www.geeksforgeeks.org/window-sliding-technique/)
- [Maximum Sum Subarray of Size K, GeeksforGeeks](https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/)
- [Longest Substring Without Repeating Characters, LeetCode #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

– Ramin ✌️
