import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { setCode } from "../redux/mainSlice";

const CodeEditor = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-2 pt-0 pr-0 bg-[#1e1e1e] rounded-md">
      <div className="flex justify-end pb-1 text-white ">
        <button className="p-1 px-6 rounded-tr-md rounded-bl-md bg-[#1DB954] hover:bg-[#159943]">
          Run
        </button>
      </div>
      <Editor
        theme="vs-dark"
        defaultLanguage="cpp"
        defaultValue={`#include <iostream>
#include <vector>

using namespace std;

vector<int> merge_sort(vector<int> arr) {
    if (arr.size() <= 1) {
        return arr;
    }

    int mid = arr.size() / 2;
    vector<int> left_half = merge_sort(vector<int>(arr.begin(), arr.begin() + mid));
    vector<int> right_half = merge_sort(vector<int>(arr.begin() + mid, arr.end()));

    return merge(left_half, right_half);
}

vector<int> merge(vector<int> left, vector<int> right) {
    vector<int> merged;
    int left_idx = 0;
    int right_idx = 0;

    while (left_idx < left.size() && right_idx < right.size()) {
        if (left[left_idx] <= right[right_idx]) {
            merged.push_back(left[left_idx]);
            left_idx++;
        } else {
            merged.push_back(right[right_idx]);
            right_idx++;
        }
    }

    while (left_idx < left.size()) {
        merged.push_back(left[left_idx]);
        left_idx++;
    }

    while (right_idx < right.size()) {
        merged.push_back(right[right_idx]);
        right_idx++;
    }

    return merged;
}

int main() {
    vector<int> unsorted_list = {38, 27, 43, 3, 9, 82, 10};
    vector<int> sorted_list = merge_sort(unsorted_list);

    cout << "Sorted list: ";
    for (int num : sorted_list) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}`}
        height="83.8vh"
        onChange={(value) => {
          dispatch(setCode(value));
        }}
      />
    </div>
  );
};

export default CodeEditor;
