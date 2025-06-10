"use strict";
class Helper {
  constructor(time, list = []) {
    this.time = parseInt(400 / time);
    this.list = list;
  }

  mark = async (index) => {
    this.list[index].setAttribute("class", "cell current");
  };

  markSpl = async (index) => {
    this.list[index].setAttribute("class", "cell min");
  };

  markVisited = async (index) => {
    this.list[index].setAttribute("class", "cell visited");
  };

  unmark = async (index) => {
    this.list[index].setAttribute("class", "cell");
  };

  pause = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.time);
    });
  };

  compare = async (index1, index2) => {
    await this.pause();
    // Increment comparison counter
    if (typeof performanceStats !== "undefined") {
      performanceStats.comparisons++;
    }
    let value1 = Number(this.list[index1].getAttribute("value"));
    let value2 = Number(this.list[index2].getAttribute("value"));
    if (value1 > value2) {
      return true;
    }
    return false;
  };

  compareValues = async (value1, value2) => {
    await this.pause();
    // Increment comparison counter
    if (typeof performanceStats !== "undefined") {
      performanceStats.comparisons++;
    }
    return value1 > value2;
  };

  swap = async (index1, index2) => {
    await this.pause();
    // Increment swap counter
    if (typeof performanceStats !== "undefined") {
      performanceStats.swaps++;
    }
    let value1 = this.list[index1].getAttribute("value");
    let value2 = this.list[index2].getAttribute("value");
    this.list[index1].setAttribute("value", value2);
    this.list[index1].style.height = `${3.8 * value2}px`;
    this.list[index2].setAttribute("value", value1);
    this.list[index2].style.height = `${3.8 * value1}px`;
  };

  updateValue = async (index, value) => {
    await this.pause();
    this.list[index].setAttribute("value", value);
    this.list[index].style.height = `${3.8 * value}px`;
  };

  getValue = (index) => {
    return Number(this.list[index].getAttribute("value"));
  };

  getMaxValue = () => {
    let max = 0;
    for (let i = 0; i < this.list.length; i++) {
      const value = this.getValue(i);
      if (value > max) {
        max = value;
      }
    }
    return max;
  };

  markRange = async (start, end, className = "cell current") => {
    for (let i = start; i <= end; i++) {
      this.list[i].setAttribute("class", className);
    }
    await this.pause();
  };

  unmarkRange = async (start, end) => {
    for (let i = start; i <= end; i++) {
      this.list[i].setAttribute("class", "cell");
    }
  };
}
