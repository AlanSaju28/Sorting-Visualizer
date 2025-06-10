"use strict";
class sortAlgorithms {
  constructor(time) {
    this.list = document.querySelectorAll(".cell");
    this.size = this.list.length;
    this.time = time;
    this.help = new Helper(this.time, this.list);
  }

  // BUBBLE SORT
  BubbleSort = async () => {
    for (let i = 0; i < this.size - 1; ++i) {
      for (let j = 0; j < this.size - i - 1; ++j) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);
        }
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      this.list[this.size - i - 1].setAttribute("class", "cell done");
    }
    this.list[0].setAttribute("class", "cell done");
  };

  // INSERTION SORT
  InsertionSort = async () => {
    for (let i = 0; i < this.size - 1; ++i) {
      let j = i;
      while (j >= 0 && (await this.help.compare(j, j + 1))) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        await this.help.pause();
        await this.help.swap(j, j + 1);
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        j -= 1;
      }
    }
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  // SELECTION SORT
  SelectionSort = async () => {
    for (let i = 0; i < this.size; ++i) {
      let minIndex = i;
      for (let j = i; j < this.size; ++j) {
        await this.help.markSpl(minIndex);
        await this.help.mark(j);
        if (await this.help.compare(minIndex, j)) {
          await this.help.unmark(minIndex);
          minIndex = j;
        }
        await this.help.unmark(j);
        await this.help.markSpl(minIndex);
      }
      await this.help.mark(minIndex);
      await this.help.mark(i);
      await this.help.pause();
      await this.help.swap(minIndex, i);
      await this.help.unmark(minIndex);
      this.list[i].setAttribute("class", "cell done");
    }
  };

  // MERGE SORT
  MergeSort = async () => {
    await this.MergeDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  MergeDivider = async (start, end) => {
    if (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      await this.MergeDivider(start, mid);
      await this.MergeDivider(mid + 1, end);
      await this.Merge(start, mid, end);
    }
  };

  Merge = async (start, mid, end) => {
    let newList = new Array();
    let frontcounter = start;
    let midcounter = mid + 1;

    while (frontcounter <= mid && midcounter <= end) {
      let fvalue = Number(this.list[frontcounter].getAttribute("value"));
      let svalue = Number(this.list[midcounter].getAttribute("value"));
      if (fvalue >= svalue) {
        newList.push(svalue);
        ++midcounter;
      } else {
        newList.push(fvalue);
        ++frontcounter;
      }
    }
    while (frontcounter <= mid) {
      newList.push(Number(this.list[frontcounter].getAttribute("value")));
      ++frontcounter;
    }
    while (midcounter <= end) {
      newList.push(Number(this.list[midcounter].getAttribute("value")));
      ++midcounter;
    }

    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell current");
    }
    for (
      let c = start, point = 0;
      c <= end && point < newList.length;
      ++c, ++point
    ) {
      await this.help.pause();
      this.list[c].setAttribute("value", newList[point]);
      this.list[c].style.height = `${3.5 * newList[point]}px`;
    }
    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell");
    }
  };

  // QUICK SORT
  QuickSort = async () => {
    await this.QuickDivider(0, this.size - 1);
    for (let c = 0; c < this.size; ++c) {
      this.list[c].setAttribute("class", "cell done");
    }
  };

  QuickDivider = async (start, end) => {
    if (start < end) {
      let pivot = await this.Partition(start, end);
      await this.QuickDivider(start, pivot - 1);
      await this.QuickDivider(pivot + 1, end);
    }
  };

  Partition = async (start, end) => {
    let pivot = this.list[end].getAttribute("value");
    let prev_index = start - 1;

    await this.help.markSpl(end);
    for (let c = start; c < end; ++c) {
      let currValue = Number(this.list[c].getAttribute("value"));
      await this.help.mark(c);
      if (currValue < pivot) {
        prev_index += 1;
        await this.help.mark(prev_index);
        await this.help.swap(c, prev_index);
        await this.help.unmark(prev_index);
      }
      await this.help.unmark(c);
    }
    await this.help.swap(prev_index + 1, end);
    await this.help.unmark(end);
    return prev_index + 1;
  };

  // RADIX SORT
  RadixSort = async () => {
    const max = this.help.getMaxValue();

    // Get number of digits in max number
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await this.CountingSortByDigit(exp);
    }

    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  CountingSortByDigit = async (exp) => {
    let output = new Array(this.size);
    let count = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < this.size; i++) {
      await this.help.mark(i);
      const digit = Math.floor(this.help.getValue(i) / exp) % 10;
      count[digit]++;
      await this.help.unmark(i);
    }

    // Change count[i] so that it contains actual position of digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = this.size - 1; i >= 0; i--) {
      await this.help.mark(i);
      const value = this.help.getValue(i);
      const digit = Math.floor(value / exp) % 10;
      output[count[digit] - 1] = value;
      count[digit]--;
      await this.help.unmark(i);
    }

    // Copy the output array to original array
    for (let i = 0; i < this.size; i++) {
      await this.help.mark(i);
      await this.help.updateValue(i, output[i]);
      await this.help.unmark(i);
    }
  };

  // COUNTING SORT
  CountingSort = async () => {
    const max = this.help.getMaxValue();
    const min = 1; // Since our random numbers start from 1
    const range = max - min + 1;

    // Create count array
    let count = new Array(range).fill(0);
    let output = new Array(this.size);

    // Store count of each element
    for (let i = 0; i < this.size; i++) {
      await this.help.mark(i);
      const value = this.help.getValue(i);
      count[value - min]++;
      await this.help.unmark(i);
    }

    // Change count[i] so that it contains actual position of element in output array
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = this.size - 1; i >= 0; i--) {
      await this.help.mark(i);
      const value = this.help.getValue(i);
      output[count[value - min] - 1] = value;
      count[value - min]--;
      await this.help.unmark(i);
    }

    // Copy the output array to original array
    for (let i = 0; i < this.size; i++) {
      await this.help.mark(i);
      await this.help.updateValue(i, output[i]);
      await this.help.unmark(i);
    }

    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  // BUCKET SORT
  BucketSort = async () => {
    const bucketCount = Math.floor(Math.sqrt(this.size));
    const max = this.help.getMaxValue();
    const min = 1;

    // Create empty buckets
    let buckets = new Array(bucketCount);
    for (let i = 0; i < bucketCount; i++) {
      buckets[i] = [];
    }

    // Put array elements in different buckets
    for (let i = 0; i < this.size; i++) {
      await this.help.mark(i);
      const value = this.help.getValue(i);
      const bucketIndex = Math.floor(
        ((value - min) / (max - min + 1)) * bucketCount
      );
      const actualIndex = Math.min(bucketIndex, bucketCount - 1);
      buckets[actualIndex].push(value);
      await this.help.unmark(i);
    }

    // Sort individual buckets using insertion sort
    for (let i = 0; i < bucketCount; i++) {
      await this.insertionSortBucket(buckets[i]);
    }

    // Concatenate all buckets into original array
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        if (index < this.size) {
          await this.help.mark(index);
          await this.help.updateValue(index, buckets[i][j]);
          await this.help.unmark(index);
          index++;
        }
      }
    }

    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  insertionSortBucket = async (bucket) => {
    for (let i = 1; i < bucket.length; i++) {
      let key = bucket[i];
      let j = i - 1;

      while (j >= 0 && (await this.help.compareValues(bucket[j], key))) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;
    }
  };
}
