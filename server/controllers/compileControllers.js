const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.compile = async (req, res) => {
  try {
    const { code, input } = req.body;
    console.log("Trying to compile...");

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    // Ensure the temp directory exists
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Define file paths
    const codeFile = path.join(tempDir, "temp.cpp");
    const inputFile = path.join(tempDir, "input.txt");
    const outputFile = path.join(tempDir, "output.txt");
    const executableFile = path.join(tempDir, "temp.exe"); // Windows executable

    // Write C++ code to file
    fs.writeFileSync(codeFile, code);

    // Write input file (even if it's empty)
    if (input) {
      fs.writeFileSync(inputFile, input);
    } else {
      fs.writeFileSync(inputFile, ""); // Ensure an empty file exists
    }

    // Debugging: Show the written C++ code
    console.log("C++ Code Written to File:");
    console.log(fs.readFileSync(codeFile, "utf-8"));

    // Check if `g++` is installed
    exec("g++ --version", (gppError, gppStdout, gppStderr) => {
      if (gppError) {
        return res.status(500).json({ error: "g++ not found. Install MinGW and add it to PATH." });
      }

      console.log("g++ Compiler Version:", gppStdout);

      // Compile the C++ code (Windows-friendly paths)
      const compileCommand = `g++ "${codeFile}" -o "${executableFile}"`;
      console.log("Compile Command:", compileCommand);

      exec(compileCommand, (compileError, stdout, stderr) => {
        if (compileError) {
          console.error("Compilation Error:", stderr);
          return res.status(400).json({ error: "Compilation Error", details: stderr });
        }

        console.log("Compilation successful!");

        // Prepare execution command with input handling
        const runCommand = input
          ? `"${executableFile}" < "${inputFile}" > "${outputFile}"`
          : `"${executableFile}" > "${outputFile}"`;
        console.log("Run Command:", runCommand);

        // Execute the compiled program
        exec(runCommand, (runtimeError, stdout, stderr) => {
          if (runtimeError) {
            console.error("Runtime Error:", stderr);
            return res.status(400).json({ error: "Runtime Error", details: stderr });
          }

          console.log("Execution successful!");

          // Read and return the output
          const output = fs.readFileSync(outputFile, "utf-8");
          return res.status(200).json({ output });
        });
      });
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
