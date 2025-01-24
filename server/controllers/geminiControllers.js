const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyA1e2jlukdfJ3Z_uQdXS0odo0KbIBaxeGc");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.explain = async (req, res) => {
  try {
    // Validate input
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code input is required" });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a highly skilled Data Structures and Algorithms (DSA) tutor. Your task is to analyze the provided code.\n\n1. If the code has errors, fix them, explain the issue, and provide the corrected code.\n2. If the code is correct, explain the algorithm it uses and the problem it solves.\n3. Walk through the code step-by-step in beginner-friendly language.\n\nHere is the code:${code}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.1,
      },
    });

    const explanation = result?.response?.text();

    if (!explanation) {
      throw new Error("No response from Gemini API.");
    }

    return res.status(200).json({ explanation });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while processing your request.",
      details: error.message,
    });
  }
};

exports.complexity = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code input is required" });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Instruction for the model:
Analyze the given code and provide the following details:

1. Time Complexity:
   - Analyze the time complexity of the given code and identify its Big-O notation (e.g., O(1), O(n), O(n^2), etc.).
   - Generate a dataset called "timeData" where:
     - The "inputSize" corresponds to the size of the input, starting from 0 and increasing uniformly (e.g., 0, 1, 2, 3, 4).
     - The "value" represents the computed result based on the time complexity formula.
       For example, if the time complexity is O(n^2):
         - For "inputSize: 0", "value: 0".
         - For "inputSize: 1", "value: 1" (1^2 = 1).
         - For "inputSize: 2", "value: 4" (2^2 = 4).
         - For "inputSize: 3", "value: 9" (3^2 = 9).
         - For "inputSize: 4", "value: 16" (4^2 = 16).
   - Ensure the "inputSize" values are taken **uniformly** (e.g., 0, 1, 2, 3, 4) without skipping intermediate values.

2. Space Complexity:
   - Analyze the space complexity of the given code and identify its Big-O notation (e.g., O(1), O(n), O(n^2), etc.).
   - Generate a dataset called "spaceData" where:
     - The "inputSize" corresponds to the size of the input, starting from 0 and increasing uniformly (e.g., 0, 1, 2, 3, 4).
     - The "value" represents the computed result based on the space complexity formula.
       For example, if the space complexity is O(n):
         - For "inputSize: 0", "value: 0".
         - For "inputSize: 1", "value: 1" (n = 1).
         - For "inputSize: 2", "value: 2" (n = 2).
         - For "inputSize: 3", "value: 3" (n = 3).
         - For "inputSize: 4", "value: 4" (n = 4).
   - Ensure the "inputSize" values are taken **uniformly** (e.g., 0, 1, 2, 3, 4) without skipping intermediate values.

3. Return the output in the following JSON format:
   {
      "complexity": {
         "timeData": [
            { "inputSize": 0, "value": 0 },
            { "inputSize": 1, "value": 1 },
            { "inputSize": 2, "value": 4 },
            { "inputSize": 3, "value": 9 },
            { "inputSize": 4, "value": 16 }
         ],
         "timeComplexity": "O(n^2)", // Replace with the actual time complexity
         "spaceData": [
            { "inputSize": 0, "value": 0 },
            { "inputSize": 1, "value": 1 },
            { "inputSize": 2, "value": 2 },
            { "inputSize": 3, "value": 3 },
            { "inputSize": 4, "value": 4 }
         ],
         "spaceComplexity": "O(n)" // Replace with the actual space complexity
      }
   }

4. Guidelines for the Response:
   - Use "inputSize" values from 0 to 4, incrementing uniformly without skipping values (e.g., do not jump from 2 to 4).
   - Ensure "inputSize: 0" always corresponds to "value: 0" for both time and space complexities.
   - Provide accurate and consistent results for both "timeComplexity" and "spaceComplexity".
   - Return the response as a valid JSON object with no additional text or explanation.

5. Here is the code to analyze:
   ${code}


`,
            },
          ],
        },
      ],
    });

    const complexity = result?.response?.text();

    if (!complexity) {
      throw new Error("Invalid response from Gemini API.");
    }

    return res.status(200).json({ complexity });
  } catch (error) {
    console.error("Error in complexity controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.notes = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code input is required" });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `<!-- Instruction for the model:
Analyze the given code and populate this HTML template with appropriate content. Follow these guidelines:
1. **Step-by-step Explanation**: Provide a clear breakdown of what the code does step by step.
2. **Problem Description and Algorithm**: Explain the problem the code solves and the algorithm or logic used.
3. **Time Complexity and Space Complexity**: Provide detailed analysis of the time and space complexity.
4. **Edge Cases**: Identify and explain key edge cases that the code should handle.
5. **Optimization Tips or Alternatives**: Suggest optimizations or alternative approaches.
6. **Code Snippet**: Embed the given code into the template, ensuring it is styled properly with a scrollable container and the background color #2d2d2d.

Populate the template with detailed notes and return it in valid HTML format. Here is the code ${code}
-->

<div class="bg-[#1e1e1e]">
  <div class="max-w-4xl flex-grow mx-auto bg-[#1e1e1e]">
    <!-- Step-by-step Explanation -->
    <section class="mb-6">
      <h2 class="text-2xl font-bold mb-2 text-white">Step-by-step Explanation</h2>
      <p class="text-gray-300 leading-relaxed">
        <!-- Add a clear breakdown of what the code does here -->
      </p>
    </section>

    <!-- Problem Description and Algorithm -->
    <section class="mb-6">
      <h2 class="text-2xl font-bold mb-2 text-white">Problem Description and Algorithm</h2>
      <p class="text-gray-300 leading-relaxed">
        <!-- Explain the problem the code solves and the algorithm used here -->
      </p>
    </section>

    <!-- Time Complexity and Space Complexity -->
    <section class="mb-6">
      <h2 class="text-2xl font-bold mb-2 text-white">Time Complexity and Space Complexity</h2>
      <ul class="list-disc list-inside text-gray-300">
        <li>
          <!-- Add time complexity analysis here -->
        </li>
        <li>
          <!-- Add space complexity analysis here -->
        </li>
      </ul>
    </section>

    <!-- Edge Cases -->
    <section class="mb-6">
      <h2 class="text-2xl font-bold mb-2 text-white">Edge Cases</h2>
      <ul class="list-disc list-inside text-gray-300">
        <li>
          <!-- Add details of key edge cases here -->
        </li>
      </ul>
    </section>

    <!-- Optimization Tips or Alternatives -->
    <section class="mb-6">
      <h2 class="text-2xl font-bold mb-2 text-white">Optimization Tips or Alternatives</h2>
      <p class="text-gray-300 leading-relaxed">
        <!-- Add optimization tips or alternative approaches here -->
      </p>
    </section>

    <!-- Code Snippet -->
    <section class="mt-8" style="background-color: #2d2d2d; padding: 16px; border-radius: 8px;">
      <h2 class="text-xl font-bold mb-2 text-white">Code Snippet</h2>
      <div class="overflow-x-auto max-w-full font-mono text-sm text-gray-300">
        <pre class="whitespace-pre p-2">
          <code>
            <!-- Embed the analyzed code here -->
          </code>
        </pre>
      </div>
    </section>
  </div>
</div>

`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.1,
      },
    });

    const notes = result?.response?.text();

    if (!notes) {
      throw new Error("No response from Gemini API.");
    }

    return res.status(200).json({ notes });
  } catch (error) {
    console.error("Error in the notes function", error.message);
    return res.status(500).json({
      error: "An error occurred in the notes function.",
      details: error.message,
    });
  }
};

exports.prompt = async (req, res) => {
  try {
    const { context, prompt, code } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt cannot be empty" });
    }
    let codePrompt;
    if (
      prompt.toLowerCase().includes("code") ||
      prompt.toLowerCase().includes("bug") ||
      prompt.toLowerCase().includes("error") ||
      prompt.toLowerCase().includes("syntax") ||
      prompt.toLowerCase().includes("function")
    ) {
      codePrompt = `${prompt}
      For reference, refer to the below code:
      ${code}
      `;
    } else {
      codePrompt = prompt;
    }

    // Start a new chat with the provided history
    const chat = model.startChat({
      history: context,
    });

    // Stream the response for the new user message
    const result = await chat.sendMessageStream(codePrompt);

    res.setHeader("Content-Type", "text/plain");

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(chunkText);
      }
    }

    res.end();
  } catch (error) {
    console.error("Error in prompt function", error.message);
    res.status(500).json({
      error: "An error occurred in the prompt function.",
      details: error.message,
    });
  }
};


exports.test = async (req,res) => {
  
  const prompt = "Explain how AI works";

  const result = await model.generateContentStream(prompt);
  
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
  res.end();

}