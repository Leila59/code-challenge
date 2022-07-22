import React from "react";
import "./App.css";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import jsonData from "./challenge-data.json";

const Tree = ({ data }) => {
  const dataKeys = Object.keys(data);
  if (dataKeys.length === 1 && typeof data[dataKeys[0]] !== "object") {
    <>
      {Array.isArray(data) && <span>[ </span>}
      <TreeItem
        nodeId={`${dataKeys[0]}-${data[dataKeys[0]]}`}
        label={`${dataKeys[0]}: ${data[dataKeys[0]]}`}
      />
      {Array.isArray(data) && <span>]</span>}
    </>;
  }

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ maxWidth: "750px" }}
    >
      {Array.isArray(data) ? (
        <div className="TreeMargin">
          <span>[ </span>
          {data.map((item, idx) => (
            <div className="TreeMargin" key={item + idx}>
              {typeof item === "object" ? (
                <>
                  <TreeItem
                    nodeId={`${item}-${idx}`}
                    key={idx}
                    label={`${idx}:`}
                  >
                    <Tree data={item} />
                  </TreeItem>
                </>
              ) : (
                <span>
                  {idx}: {item}
                </span>
              )}
            </div>
          ))}
          ]
        </div>
      ) : (
        Object.keys(data).map((item, idx) =>
          typeof data[item] !== "object" ? (
            <TreeItem
              nodeId={`${item}-${data[item]}`}
              key={idx}
              label={`${item}: ${data[item]}`}
            />
          ) : (
            <TreeItem
              nodeId={`${item}-${data[item]}-${idx}`}
              key={idx}
              label={item}
            >
              <Tree data={data[item]} />
            </TreeItem>
          )
        )
      )}
    </TreeView>
  );
};

const App = () => {
  return (
    <div className="App">
      <h2>Data Tree</h2>
      <Tree data={jsonData} />
    </div>
  );
};

export default App;
