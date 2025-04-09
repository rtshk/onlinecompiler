export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
    cpp: "10.2.0",
  };
  
  
  export const CODE_SNIPPETS = {
    javascript: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log("Factorial of 5 is", factorial(5));\n// Factorial using recursion`,
  
    typescript: `function square(num: number): number {\n  return num * num;\n}\nconsole.log("Square of 6 is", square(6));\n// Type-safe square function`,
  
    python: `for i in range(1, 11):\n  if i % 2 == 0:\n    print(i, end=" ")\n# Print even numbers in a range`,
  
    java: `public class PrimeCheck {\n  public static void main(String[] args) {\n    int num = 7, count = 0;\n    for (int i = 1; i <= num; i++) {\n      if (num % i == 0) count++;\n    }\n    System.out.println(count == 2 ? "Prime" : "Not Prime");\n  }\n}\n// Check if a number is prime`,
  
    csharp: `using System;\nclass Program {\n  static void Main() {\n    string input = "hello";\n    char[] arr = input.ToCharArray();\n    Array.Reverse(arr);\n    Console.WriteLine(new string(arr));\n  }\n}\n// Reverse a string`,
  
    php: `<?php\n$arr = [1, 2, 3, 4];\necho "Sum = " . array_sum($arr);\n// Sum of an array`,
  
    cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  int n, key;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> key;\n  for (int i = 0; i < n; i++) {\n    if (arr[i] == key) {\n      cout << "Found at index " << i << endl;\n      return 0;\n    }\n  }\n  cout << "Not found" << endl;\n  return 0;\n}\n// Linear search in array`
  };
  
  
  