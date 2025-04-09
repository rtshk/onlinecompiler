import React from "react";
import Nav from "./Nav";
import {Grid} from 'react-loading-icons'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import { useSelector } from "react-redux";

const Complexity = () => {
  // Data for O(n)
  const complexity = useSelector((state) => state.main.complexity);
  const loading = useSelector((state) => state.main.complexityLoading);

  const data = [
    { inputSize: 0, value: 0 },
    { inputSize: 1, value: 1 },
    { inputSize: 2, value: 2 },
    { inputSize: 3, value: 3 },
    { inputSize: 4, value: 4 },
    { inputSize: 5, value: 5 },
    { inputSize: 15, value: 15 },
  ];

  return (
    <div className="w-full rounded-md text-[#e0e0e0] h-full">
      <h1 className="text-2xl font-bold p-3">Complexity</h1>
      <Nav />{
          loading ? <div className="w-full h-full flex items-center justify-center">
            <Grid height="30px" width="30px"/>
          </div> : <div className="p-2 flex flex-col h-full gap-6">
          {/* Time Complexity */}
          <div className="h-[40%]">
            <h2 className="text-xl font-semibold mb-3">Time Complexity</h2>
            <div className="flex w-full justify-center">
              <LineChart
                width={300}
                height={200}
                data={complexity.timeData}
                margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
              >
                {/* X-Axis */}
                <XAxis dataKey="inputSize" tick={false} stroke="#ccc">
                  <Label
                    value={`${complexity.timeComplexity}`}
                    offset={-10}
                    position="insideBottom"
                  />
                </XAxis>
                {/* Y-Axis */}
                <YAxis tick={false} stroke="#ccc">
                  <Label
                    value="Time"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
  
          {/* Space Complexity */}
          <div className="h-[40%]">
            <h2 className="text-xl font-semibold mb-3">Space Complexity</h2>
            <div className="flex w-full justify-center">
              <LineChart
                width={300}
                height={200}
                data={complexity.spaceData}
                margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
              >
                {/* X-Axis */}
                <XAxis dataKey="inputSize" tick={false} stroke="#ccc">
                  <Label
                    value={`${complexity.spaceComplexity}`}
                    offset={-10}
                    position="insideBottom"
                  />
                </XAxis>
                {/* Y-Axis */}
                <YAxis tick={false} stroke="#ccc">
                  <Label
                    value="Space"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default Complexity;
