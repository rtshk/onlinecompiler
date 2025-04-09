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
    javascript: `
  // Factorial using recursion
  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }
  
  console.log("Factorial of 5 is", factorial(5));
  `,
  
    typescript: `
  // Type-safe square function
  function square(num: number): number {
    return num * num;
  }
  
  console.log("Square of 6 is", square(6));
  `,
  
    python: `
  # Print even numbers in a range
  for i in range(1, 11):
    if i % 2 == 0:
      print(i, end=" ")
  `,
  
    java: `
  // Check if a number is prime
  public class PrimeCheck {
    public static void main(String[] args) {
      int num = 7, count = 0;
      for (int i = 1; i <= num; i++) {
        if (num % i == 0) count++;
      }
      System.out.println(count == 2 ? "Prime" : "Not Prime");
    }
  }
  `,
  
    csharp: `
  // Reverse a string
  using System;
  
  class Program {
    static void Main() {
      string input = "hello";
      char[] arr = input.ToCharArray();
      Array.Reverse(arr);
      Console.WriteLine(new string(arr));
    }
  }
  `,
  
    php: `
  <?php
  // Sum of an array
  $arr = [1, 2, 3, 4];
  echo "Sum = " . array_sum($arr);
  ?>
  `,
  
    cpp: `
  // Linear search in array
  #include <iostream>
  using namespace std;
  
  int main() {
    int n, key;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    cin >> key;
  
    for (int i = 0; i < n; i++) {
      if (arr[i] == key) {
        cout << "Found at index " << i << endl;
        return 0;
      }
    }
    cout << "Not found" << endl;
    return 0;
  }
  `,
  };
  