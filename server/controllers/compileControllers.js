const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.compile = async (req, res) => {
  try {
    const { code, input } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    // Ensure the temp directory exists
    const tempDir = path.join(__dirname, "temp");

    // Create temporary files for code and input
    const codeFile = path.join(tempDir, "temp.cpp");
    const inputFile = path.join(tempDir, "input.txt");
    const outputFile = path.join(tempDir, "output.txt");

    fs.writeFileSync(codeFile, code);
    if (input) {
      fs.writeFileSync(inputFile, input);
    }

    // Compile the C++ code
    const compileCommand = `g++ ${codeFile} -o ${codeFile}.out`;
    exec(compileCommand, (compileError) => {
      if (compileError) {
        return res.status(400).json({ error: "Compilation Error", details: compileError.message });
      }

      // Run the compiled binary
      const runCommand = input
        ? `${codeFile}.out < ${inputFile} > ${outputFile}`
        : `${codeFile}.out > ${outputFile}`;        
      
      exec(runCommand, (runtimeError) => {
        if (runtimeError) {
          return res.status(400).json({ error: "Runtime Error", details: runtimeError.message });
        }

        // Read the output
        const output = fs.readFileSync(outputFile, "utf-8");
        return res.status(200).json({ output });
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
